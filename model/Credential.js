import '../shim.js'
import sjcl from 'sjcl'
import Base64 from './Base64'

var encryption_config = {
    adata: "",
    iter: 1000,
    ks: 256,
    mode: 'ccm',
    ts: 64
};

export default class Credential {

    static generateSubUrl(credential_guid) {
        return "credentials"+(vault_guid!==null ? "/"+credential_guid : "")
    }

    correctValue(value) {
        if(value == null) return null
        char0 = value.charAt(0)
        charLast = value.charAt(value.length-1)
        if(char0 == '"' && charLast == '"') value = value.substr(1, value.length - 2)
        if(value == "") value = null
        if(value == "null") value = null
        return value
    }

    get credential_id() {
        return this._credential_id;
    }

    set credential_id(value) {
        this._credential_id = value;
    }

    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = this.correctValue(value);
    }

    get created() {
        return this._created;
    }

    set created(value) {
        var c = new Date(value * 1000)
        this._created = c;
    }

    get changed() {
        return this._changed;
    }

    set changed(value) {
        var c = new Date(value * 1000)
        this._changed = c;
    }

    get tags() {
        return this._tags;
    }

    set tags(value) {
        this._tags = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = this.correctValue(value);
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = this.correctValue(value);
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = this.correctValue(value)
    }

    get url() {
        return this._url;
    }

    set url(value) {
        this._url = this.correctValue(value);
    }

    get favicon() {
        return this._favicon;
    }

    set favicon(value) {
        this._favicon = value;
    }

    get renew_interval() {
        return this._renew_interval;
    }

    set renew_interval(value) {
        this._renew_interval = value;
    }

    get expire_time() {
        return this._expire_time;
    }

    set expire_time(value) {
        var c = new Date(value * 1000)
        this._expire_time = c;
    }

    get delete_time() {
        return this._delete_time;
    }

    set delete_time(value) {
        var c = new Date(value * 1000)
        this._delete_time = c;
    }

    get files() {
        return this._files;
    }

    set files(value) {
        this._files = value;
    }

    get custom_fields() {
        return this._custom_fields;
    }

    set custom_fields(value) {
        this._custom_fields = value;
    }

    get otp() {
        return this._otp;
    }

    set otp(value) {
        this._otp = value;
    }

    get hidden() {
        return this._hidden;
    }

    set hidden(value) {
        this._hidden = (value == 1);
    }

    get vault_id() {
        return this._vault_id
    }
    set vault_id(vault_id) {
        this._vault_id = vault_id
    }

    decryptString(ciphertext, _key) {
        if(!ciphertext || !_key){
            return '';
        }
        ciphertext = Base64.atob(ciphertext)
        try {
            return sjcl.decrypt(_key, ciphertext)
        } catch (e) {
            throw e;
        }
    }

    decrypt(_key) {
        //decrypt all encrypted fields
        this.description = this.decryptString(this.description, _key)
        this.username = this.decryptString(this.username, _key)
        this.password = this.decryptString(this.password, _key)
        this.files = this.decryptString(this.files, _key)
        this.custom_fields = this.decryptString(this.custom_fields, _key)
        this.otp = this.decryptString(this.otp, _key)
        this.email = this.decryptString(this.email, _key)
        this.tags = this.decryptString(this.tags, _key)
        this.url = this.decryptString(this.url, _key)
    }
}