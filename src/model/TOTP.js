import jsSHA from 'jssha'

export default class TOTP {

    static dec2hex(dec) {
        return (dec < 15.5 ? "0" : "") + Math.round(dec).toString(16);
    }

    static hex2dec(hex) {
        return parseInt(hex, 16)
    }

    static leftpad(s, l, p) {
        if(l + 1 >= s.length) {
            s = Array(l + 1 - s.length).join(p) + s
        }
        return s
    }

    static base32tohex(base32) {
        let base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        bits = "";
        hex = "";
        for(let i = 0; i < base32.length; i++) {
            val = base32chars.indexOf(base32.charAt(i).toUpperCase());
            bits += this.leftpad(val.toString(2), 5, '0');
        }
        for(let i = 0; i + 4 <= bits.length; i+=4) {
            chunk = bits.substr(i, 4);
            hex = hex + parseInt(chunk, 2).toString(16) ;
        }
        return hex;
    }

    static getOTP(secret) {
        try {
            epoch = Math.round(new Date().getTime() / 1000.0)
            time = this.leftpad(this.dec2hex(Math.floor(epoch / 30)), 16, "0")

            shaObj = new jsSHA("SHA-1", "HEX")
            shaObj.setHMACKey(this.base32tohex(secret), "HEX");
            shaObj.update(time)
            hmac = shaObj.getHMAC("HEX")

            offset = this.hex2dec(hmac.substring(hmac.length - 1))

            otp = (this.hex2dec(hmac.substr(offset * 2, 8)) & this.hex2dec("7fffffff")) + ""
            otp = (otp).substr(otp.length - 6, 6)
        } catch (e) {
            throw e
        }
        return otp
    }
}