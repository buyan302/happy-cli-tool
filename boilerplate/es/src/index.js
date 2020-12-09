// source code entry
import 'core-js/stable'
import 'regenerator-runtime/runtime'

export default () => `this is source code entry`

// // ES6
// const [a, b] = [...[1, 2]]
// const { c: cc, d: dd } = { ...{ c: 1, d: 2 }, c: 2 }
// Promise.resolve(1)
// const arrowFunc = (a, b = 1) => {}
// const str = `${1}${'a'}`
// class A {
//   f() {}

//   af = () => {}
// }

// // ES7
// ;[1, 2].includes(1)
// const c = 2 ** 6

// // ES8
// async function f() {
//   await Promise.resolve(1)
// }
// Object.keys({ a: 1, b: 2 })

// // ES9
// function f1(...args) {
//   console.log(args)
// }
// f1(1, 2)
// async function f2() {
//   for await (const i of [1, 2]) {
//     console.log('await ', i)
//   }
// }
// f2()
// Promise.resolve(1).finally(() => {})

// // ES10
// const arr = [
//   [2, 3],
//   [4, 5],
// ].flat()
// const obj = Object.fromEntries([
//   ['a', 1],
//   ['b', 2],
// ])
// console.log(Symbol('my symbol').description)

// // dynamic import
// import('./a').then((a) => console.log('module a: ', a))

// // decorator
// function decorator() {
//   return (cls) => {
//     new cls()
//   }
// }

// @decorator()
// class Cls {
//   constructor() {
//     console.log('decorator init')
//   }
// }
