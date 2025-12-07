

class UserService{

    static get= async(model,filters={},options={})=>{
        let result;
        const query = model.findOne(filters)
            .populate(options.populate)
            .select(options.select || "")   
        if (options.lean) {
            query.lean();
        }   
        result = await query;
        return result;
    }

    static search= async(model,filters={},options={})=>{

        console.log("filters",filters)
        console.log("options",options)
        let result;
        const query = model.find(filters)
            .select(options.select || "")
            .skip(options.skip || 0)
            .limit(options.limit || 10)
            .populate(options.populate);
        
        
        if (options.lean) { 
            query.lean();
        }


        result = await query;
        return result;
    }

    static update= async(model,filters={},data={})=>{
        // const result = await model.findOneAndUpdate(
        //     filters,
        //     { $set: data },
        //     { new: true } 
        // );
        // return result;
    }      
}