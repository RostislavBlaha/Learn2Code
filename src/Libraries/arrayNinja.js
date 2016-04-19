export function add(array, item){   
    var newData = array
    item.id = array.length
    newData.push(item)
    return(
        newData
    )
}
    
export function edit(array, item) {       
    var newData = array
    newData[item.id] = item
    return(
        newData
    )
}

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