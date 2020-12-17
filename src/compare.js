import got from 'got'
import { get } from 'lodash'
import AsciiTable from 'ascii-table'
import ora from 'ora'
import config from './config'

const fields = [
  'description',
  'homepage',
  'repository',
  'license',
  'keywords',
  'latest',
  'next',
  'experimental',
  'untagged',
  'deprecations',
  'maintainers',
  'downloads',
  'dependents',
  'git star',
  'open issues',
  'quality',
  'popularity',
  'maintenance',
]

const ajaxOption = {
  prefixUrl: config.registryHome,
  responseType: 'json',
  headers: {
    'x-requested-with': 'XMLHttpRequest',
    'x-spiferack': 1,
  },
}

// fetch package data from npmjs.com
async function fetchMetadata(name) {
  const {
    body: { objects },
  } = await got(`search`, {
    searchParams: { q: name },
    ...ajaxOption,
  })
  const { body: pkgInfo } = await got(`package/${name}`, ajaxOption)
  const gitInfo = pkgInfo.ghapi ? (await got(pkgInfo.ghapi, { responseType: 'json' })).body : {}

  const scoreObj = get(
    objects.find(({ package: pkg }) => pkg.name === name),
    'score.detail'
  )

  return {
    git: gitInfo,
    pkg: { ...pkgInfo, ...scoreObj },
  }
}

// reduce downloads
function reduceDownloads(arr) {
  return arr.reduce((acc, { downloads }) => acc + downloads, 0)
}

// handle pkg data
function handleMetaData(metadata) {
  const {
    // eslint-disable-next-line camelcase
    git: { stargazers_count, open_issues },
    pkg: {
      packument: {
        name,
        description,
        homepage,
        repository,
        license,
        keywords,
        distTags,
        deprecations,
        maintainers,
      },
      downloads = [],
      dependents: { dependentsCount },
      quality,
      popularity,
      maintenance,
    },
  } = metadata
  const data = {
    name,
    description,
    homepage,
    repository,
    license,
    keywords,
    quality,
    popularity,
    maintenance,
    ...distTags,
    deprecations,
    maintainers: maintainers.map(
      ({ name: userName, email }) => `${userName}<${email || 'unknown'}>`
    ),
    downloads: [
      `lastWeek: ${reduceDownloads(downloads.slice(-1))}`,
      `lastMonth: ${reduceDownloads(downloads.slice(-4))}`,
    ],
    dependents: dependentsCount,
    'git star': stargazers_count,
    'open issues': open_issues,
  }

  return data
}

// number to string
function stringify(values) {
  if (values instanceof Array) {
    return values.map(stringify)
  }

  return typeof values === 'number' ? `${values}` : values
}

// print data
function printData(datas) {
  const table = new AsciiTable()
  const headers = datas.map((data) => data.name)
  let matrix = [['', ...headers]]

  fields.forEach((f) => {
    const values = datas.map((data) => data[f])
    if (values[0] instanceof Array) {
      const maxRows = Math.max(...values.map((v) => v.length))
      matrix = matrix.concat(
        new Array(maxRows).fill(0).map((r, i) => [i ? '' : f, ...values.map((v) => v[i])])
      )
    } else {
      matrix.push([f, ...values])
    }
  })

  table.setHeading(matrix[0])
  table.addRowMatrix(stringify(matrix.slice(1)))
  console.log(table.toString())
}

export default async (pkgs) => {
  const progress = ora()
  progress.start('fetch package metadata...\n')
  try {
    const metadatas = await Promise.all(pkgs.map(fetchMetadata))
    const datas = metadatas.map(handleMetaData)
    progress.succeed()
    printData(datas)
  } catch (e) {
    progress.fail(e.message)
  }
}
