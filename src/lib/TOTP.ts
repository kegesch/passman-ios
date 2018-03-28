import jsSHA from 'jssha'

export default class TOTP {

	static dec2hex(dec): string {
		return (dec < 15.5 ? '0' : '') + Math.round(dec).toString(16)
	}

	static hex2dec(hex): number {
		return parseInt(hex, 16)
	}

	static leftpad(s, l, p): string {
		if (l + 1 >= s.length) {
			s = Array(l + 1 - s.length).join(p) + s
		}
		return s
	}

	static base32tohex(base32): string {
		const base32chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
		let bits: string = ''
		let hex: string = ''
		for (let i = 0; i < base32.length; i++) {
			const val = base32chars.indexOf(base32.charAt(i).toUpperCase())
			bits += this.leftpad(val.toString(2), 5, '0')
		}
		for (let i = 0; i + 4 <= bits.length; i += 4) {
			const chunk = bits.substr(i, 4);
			hex = hex + parseInt(chunk, 2).toString(16)
		}
		return hex
	}

	static getOTP(secret) {
		try {
			const epoch = Math.round(new Date().getTime() / 1000.0)
			const time = this.leftpad(this.dec2hex(Math.floor(epoch / 30)), 16, '0')

			const shaObj = new jsSHA('SHA-1', 'HEX')
			shaObj.setHMACKey(this.base32tohex(secret), 'HEX')
			shaObj.update(time)

			const hmac = shaObj.getHMAC('HEX')

			const offset = this.hex2dec(hmac.substring(hmac.length - 1))

			let otp = (TOTP.hex2dec(hmac.substr(offset * 2, 8)) & this.hex2dec('7fffffff')) + ''
			otp = (otp).substr(otp.length - 6, 6)

			return otp
		} catch (e) {
			throw e
		}
	}
}