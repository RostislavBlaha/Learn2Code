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
    
export function add(array, data){   
    var newData = array
    newData.push(object)
    newData.push({id: array.length})
    return(
        newData
    )
}
    
export function edit(array, itemId, data) {       
    var newData = array
    newData[itemId] = data
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
    
export function moveToArray(oldArray, newArray, itemId){
    var id = itemId - 1
    var item = oldArray[id]
    var newArrayNewData = newArray
    var oldArrayNewData = oldArray
    item.id = newArrayNewData.length + 1
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