export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email || email.length <= 0) return "Username tidak boleh kosong."
  if (!re.test(email)) return 'Username salah.'
  return ''
}
