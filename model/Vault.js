export default class Vault {

    static generateSubUrl(vault_guid = null) {
        return "vaults"+(vault_guid!==null ? "/"+vault_guid : "")
    }

    get vault_id() {
        return this._vault_id
    }

    set vault_id(vault_id) {
        this._vault_id = vault_id
    }

    get guid() {
        return this._guid
    }

    set guid(guid) {
        this._guid = guid
    }

    get name() {
        return this._name
    }

    set name(name) {
        this._name = name
    }

    get created() {
        return this._created
    }

    set created(created) {
        var c = new Date(created * 1000)
        this._created = c
    }

    get public_sharing_key() {
        return this._public_sharing_key
    }

    set public_sharing_key(pbk) {
        this._public_sharing_key = pbk
    }

    get private_sharing_key() {
        return this._private_sharing_key
    }

    set private_sharing_key(pbk) {
        this._private_sharing_key = pbk
    }

    get last_access() {
        return this._last_access
    }

    set last_access(la) {
        var l = new Date(la * 1000)
        this._last_access = l
    }

    get challenge_password() {
        return this._challenge_password
    }

    set challenge_password(cp) {
        this._challenge_password = cp
    }

    get credentials() {
        return this._credentials
    }

    set credentials(credentials) {
        this._credentials = credentials;
    }

    get key() {
        return this._key
    }

    set key(key) {
        this._key = key;
    }
}