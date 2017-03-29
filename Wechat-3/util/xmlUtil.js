var xml2js = require('xml2js')
var promise = require('bluebird')
var tpl = require('./tpl')

exports.parseXMLAsync = function(xml) {
    return new Promise(function(resolve, reject) {
        xml2js.parseString(xml, {trim: true}, function(err, content) {
            if (err) reject(err)
            else resolve(content)
        })
    })
}

// async function parseXMLAsync (xml) {
//     await xml2js.parseString(xml, {trim: true}, function(err, content) {
//         return content;
//     })
// }

function formatMessage(result) {
    var message = {};
    if (typeof result === 'object') {
        console.log("1 " + result)
        var keys = Object.keys(result)
        for (var i = 0; i < keys.length; i++) {            
            var item = result[keys[i]]
            var key = keys[i];
            
            // if ((!(item instanceof Array ) || item.length === 0) ) {
            //     continue;
            // }
            if (item.length === 1) {
                var val = item[0]

                if (typeof val === 'object') {
                    message[key] = formatMessage(val)
                }
                else {
                    message[key] = (val || '')
                }
            } else {
                message[key] = []

                for (var j = 0, k = item.length; j < k; j++) {
                    message[key].push(formatMessage(item[j]))
                }
            }
        }
    } else {
        return result;        
    }
    return message
}

// exports.parseXMLAsync = parseXMLAsync
exports.formatMessage = formatMessage

exports.tpl = function(content, message) {
    console.log(1)
    var info = {}
    var type = 'text'
    var formUserName = message.FromUserName
    var toUserName = message.ToUserName

    if (Array.isArray(content)) {
        type = 'news'
    }

    type = content.type || type
    info.content = content
    info.createTime = new Date().getTime()
    info.msgType = type
    info.toUserName = fromUserName
    info.fromUserName = toUserName

    console.log('Info ' + info)
    // return tpl.complied(info)
}