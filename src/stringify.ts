/**
 * A versão atual da API decodifica caracteres UTF-8 duas vezes.
 *
 * Buffer.from('é', 'utf-8')
 * <Buffer c3 a9>
 * Torna-se ? no IXC.
 *
 * Buffer.from(Buffer.from('é', 'utf-8').toString('binary'), 'utf-8')
 * <Buffer c3 83 c2 a9>
 * Torna-se é no IXC.
 */
export function ixcStringify(obj: any): string {
  return Buffer.from(JSON.stringify(obj), "utf-8").toString("binary");
}
