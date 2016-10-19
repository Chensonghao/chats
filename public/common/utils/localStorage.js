var key = 'chatsRecords';
module.exports = {
    get: function(name) {
        try {
            var data = window.localStorage.getItem(key);
            if (data) {
                var records = JSON.parse(data);
                return records[name] || [];
            }
            return [];
        } catch (e) {
            console.log('not support localStorage!');
            return [];
        }
    },
    set: function(name, msg) {
        try {
            var data = window.localStorage.getItem(key);
            var obj = data ? JSON.parse(data) : {};
            var records = obj[name] || [];
            records.push(msg);
            obj[name] = records;
            window.localStorage.setItem(key, JSON.stringify(obj));
        } catch (e) {
            console.log('not support localStorage!');
        }
    }
}
