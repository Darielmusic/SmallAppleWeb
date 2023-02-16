const mssql = require("mssql");
const pools = new Map();

module.exports = {
    // @param {string} name
    // @param {{}} [config]
    // @return {Promise.<mssql.ConnectionPool>}

    get:(name, config)=>{
        if(!pools.has(name)){
            if(!config){
                throw new Error("Pool does not exist");
            }
            const pool = new mssql.ConnectionPool(config);
            const close = pool.close.bind(pool);
            pool.close = (...args) => {
                pools.delate(name)
                return close(...args)
            };
            pools.set(name, pool.connect());
        }
        return pools.get(name);
    },

    closeAll:()=>
    Promise.all(
        Array.from(pools.values()).map((connect)=>{
            return connect.then((pool)=>pool.close());
        })
    ),
};