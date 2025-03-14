export function extractDomainOrIP(str: string) {
  // 正则表达式：匹配域名或 IP 地址
  const pattern = /(?:https?:\/\/)?([^\/\?:]+|\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b)/;
  const match = str.match(pattern);

  if (match) {
    return match[1]; // 返回域名或 IP 地址
  }
  return null; // 如果没有匹配，返回 null
}
export  function generateCustomRandomString(length = 10,chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_?') {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
