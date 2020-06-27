module.exports = {

    getCols: (obj) => {

        let cols = Object.keys(obj)
        let colsStr = ""

        for(let i = 0; i < cols.length; i++) {

            colsStr += cols[i]
            if(i <= (cols.length - 2)) colsStr += ","

        }

        return colsStr

    },

    getVals: (obj) => {

        let vals = Object.values(obj)
        let valStr = JSON.stringify(vals)
        valStr = valStr.replace("[", "").replace("]", "")
        return valStr

    }

}