export default class StorageUtil {
    constructor() {}

    /** localStorage, если он доступен, либо обычный объект */
    storage

    /** sessionStorage, если он доступен, либо обычный объект */
    sessionStorage

    /**
     * Возвращает значение из storage по ключу
     * @param key          ключ, по которому получается значение
     * @param defaultValue значение по умолчанию
     * @param session      признак получения из sessionStorage
     * @returns значение, сохраненное в storage, или defaultValue, если null или undefined
     */
    get(key, defaultValue, session = false) {
        const storage = this.getStorage(session)
        try {
            const value = JSON.parse(storage[key])
            return value || defaultValue
        } catch (e) {
            return defaultValue
        }
    }

    /**
     * Устанавливает значение в storage по указанному ключу
     * @param key     ключ, по которому сохраняется значение
     * @param value   значение, сохраняемое в storage
     * @param session признак установки значения в sessionStorage
     * @returns {@code true} в случае успешного сохранения, {@code false}
     *  если вывалились с ошибкой и не сохранили
     */
    set(key, value, session = false) {
        const storage = this.getStorage(session)
        try {
            storage[key] = JSON.stringify(value)
        } catch (e) {
            return false
        }
        return true
    }

    /**
     * Удаляет настройку из storage по указанному ключу
     * @param key     ключ
     * @param session признак удаления из sessionStorage
     */
    delete(key, session = false) {
        const storage = this.getStorage(session)
        if (storage.removeItem) {
            storage.removeItem(key)
        } else {
            delete storage[key]
        }
    }

    /**
     * Возвращает localStorage или sessionStorage
     * @param session признак работы с sessionStorage
     */
    getStorage(session) {
        return session ? window.sessionStorage : window.localStorage
    }
}