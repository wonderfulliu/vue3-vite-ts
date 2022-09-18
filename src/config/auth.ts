/* 
  权限控制，二进制码
  &，|：位运算符，对二进制数据逐位进行比较，如不是二进制，则转为二进制
  &&，||：逻辑运算符
  &、|、^、~
 */
const CREATE = 0b0001
const DELETE = 0b0010
const UPDATE = 0b0100
const DETAIL = 0b1000

/* 
  如，返回的 result：0b0111
  组合权限：result = CREATE | DELETE | UPDATE
  判定权限：只需判断(result & CREATE) === CREATE 是否为 true 即可判断该 result 是否有 CREATE 权限
  删除权限：result = result ^ UPDATE
*/
// 组合权限
const result = CREATE | DELETE | UPDATE

// 判断返回的结果是否有 CREATE 权限
console.log((result & CREATE) === CREATE);

// 删除 UPDATE 权限
console.log((result ^ UPDATE));
