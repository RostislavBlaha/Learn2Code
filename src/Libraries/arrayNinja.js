export function removeItemFromArray(array, id){
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
    
export function addItemToArray(array, url){   
    var newData = array;
    var name = url.url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0]
    var fixedURL
    var prefix = 'http://'
    if (!/^https?:\/\//i.test(url.url)){
        fixedURL = prefix + url.url
    }else{
        fixedURL = url.url        
    }
    newData.push({    id: array.length + 1, 
                    url: fixedURL, 
                    name: name, 
                    description:"Tady bude meta description" })
    return(
        newData
    )
}
    
export function editItemInArray(array, itemId, url) {       
    var newData = array
    var name = url.url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0]
    var fixedURL
    var id = itemId - 1
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
    
export function moveItemInArray(array, oldID, newID){
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
                        newData[i].id = newData[i].id - 1
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