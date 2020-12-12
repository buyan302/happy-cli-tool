import got from 'got'
import {pick} from 'lodash'
import AsciiTable from 'ascii-table'
import config from './config'

const fields = [
  'description', 'homepage', 'repository', 'license',
  'latest', 'next', 'experimental', 'untagged',
  'maintainers'
]

// fetch package data from npmjs.com
async function fetchMetadata(name) {
  const {body: pkgInfo} = await got(`package/${name}`, {
    prefixUrl: config.registryHome,
    responseType: 'json',
    headers: {
      'x-requested-with': 'XMLHttpRequest',
      'x-spiferack': 1
    }
  })
  // const gitInfo = pkgInfo.ghapi ? await got(pkgInfo.ghapi, {responseType: 'json'}) : {}

  return {
    // git: gitInfo,
    pkg: pkgInfo
  }
}

// handle pkg data
function handleMetaData(metadata) {
  const {git, pkg: {packument}} = metadata
  const data = {
    ...pick(packument, ['name', 'description', 'homepage', 'repository', 'license']),
    ...packument.distTags,
    maintainers: packument.maintainers.map(({name, email}) => `${name}<${email}>`)
  }

  return data
}

// print data 
function printData(datas) {
  const table = new AsciiTable()
  const headers = datas.map(data => data.name)
  table.setHeading('', ...headers)

  fields.forEach(
    f => {
      const values = datas.map(data => data[f])
      if(values[0] instanceof Array) {
        const maxRows = Math.max(...values.map(v => v.length))
        table.addRowMatrix(new Array(maxRows).fill(0).map(
          (r, i) => [i ? '' : f, ...values.map(v => v[i])]
        ))
      } else {
        table.addRow(f, ...values) 
      }
    }
  )

  console.log(table.toString())
}

export default async (pkgs) => {
  console.log(pkgs)
  const metadatas = await Promise.all(pkgs.map(fetchMetadata))
  const datas = metadatas.map(handleMetaData)

  printData(datas)
}
