export function remove(array, id){
    var newData = array.filter(function(obj){return (obj.id != id)})
    for (var i = 0; i < newData.length; i++) {
        if (newData[i].id > id){
            newData[i].id--
        }
    }
    return(
        newData
    )

}
    
export function add(array, url){   
    var newData = array;
    var name = url.url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0]
    var fixedURL
    var prefix = 'http://'
    if (!/^https?:\/\//i.test(url.url)){
        fixedURL = prefix + url.url
    }else{
        fixedURL = url.url        
    }
    newData.push({  id: array.length, 
                    url: fixedURL, 
                    name: name, 
                    description:"Tady bude meta description" })
    return(
        newData
    )
}
    
export function edit(array, itemId, url) {       
    var newData = array
    var name = url.url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0]
    var fixedURL
    var id = itemId
    var prefix = 'http://'
    if (!/^https?:\/\//i.test(url.url)){
        fixedURL = prefix + url.url
    }else{
        fixedURL = url.url        
    }
        
    newData[id].url = fixedURL 
    newData[id].name = name 
    newData[id].description = "Tady bude meta description"
    return(
        newData
    )
}
    
export function move(array, oldID, newID){
    var newData = array
    var startCard = ""  
        
    for (var i = 0; i < newData.length; i++) {
        if (newData[i].id == oldID){
            startCard = newData[i]
        }
    }
       
    if (startCard.id < newID){
            for (var i = 0; i < newData.length; i++) {
                if (newData[i].id > startCard.id && newData[i].id <= newID){
                    newData[i].id--
                }
            }  
    } else if (startCard.id > newID){   
            for (var i = 0; i < newData.length; i++) {
                if (newData[i].id < startCard.id && newData[i].id >= newID){
                    newData[i].id++
                }
            }  
        } 
    startCard.id = newID
    newData.sort((a, b) => a.id - b.id)
    return(
        newData
    )
}
    
export function moveToArray(oldArray, newArray, itemId){
    var id = itemId
    var item = oldArray[id]
    var newArrayNewData = newArray
    var oldArrayNewData = oldArray
    item.id = newArrayNewData.length
    newArrayNewData.push(item)
    oldArrayNewData.filter(function(obj){return (obj.id != id)})
    for (var i = 0; i < oldArrayNewData.length; i++) {
        if (oldArrayNewData[i].id > id){
            oldArrayNewData[i].id--
        }
    }
    return({
        newArrayNewData: newArrayNewData,
        oldArrayNewData: oldArrayNewData,
    })
    
}