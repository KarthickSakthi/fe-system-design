const PROTO_PATH ="./customers.proto";

const grpc = require("@grpc/grpc-js");
const grpcProtoLoader = require("@grpc/proto-loader");

const packageDefinition = grpcProtoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums:String,
    arrays:true
})



const customersProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const customers=[{
    id:123,
    name:"Karthick",
    age:23,
    address: "Banglore"
},{
    id:1212323,
    name:"Sakthi",
    age:24,
    address: "Chennai"
}]

server.addService(customersProto.CustomerService.service,{
    getAll:(call,callback)=>{
    //DB call or any
    callback(null, {customers})
    },
    get:(call,callback)=>{
        const customer = customers.find(cus=> cus.id = call.request.id);
        if(customer)
            callback(null, {customer})
        else
           callback({
           code:grpc.status.NOT_FOUND,
           details:"NOT FOUND"
        })
    },
    insert:(call,callback)=>{
        let customer = call.request;
        customer.id = Math.random(); // uuidv4 - unique id generating library
        customers.push(customer);
        callback(null,{customer})
    },
    update:(call,callback)=>{
        let existingCustomer = customers.find(cus => cus.id === call.request.id);
        if(existingCustomer){
            existingCustomer={...existingCustomer, ...call.request};
            callback(null, {existingCustomer})
        }
        else
        callback({
            code:grpc.status.NOT_FOUND,
            details:"NOT FOUND"
         })
    },
    remove:(call, callback)=>{
        let customerIndex = customers.findIndex(cus => cus.id === call.request.id);
        if(customerIndex!==-1){
            customers.splice(customerIndex,1)
           callback(null, {message:"success"})
        }
        else
        callback({
            code:grpc.status.NOT_FOUND,
            details:"NOT FOUND"
         })
    
    }
})

server.bindAsync("127.0.0.1:30043", grpc.ServerCredentials.createInsecure(), (err, port)=>{
    if(err){
        console.log(`error starting gRPC server ${err}`)
    }
    else{
        server.start();
        console.log(`gRPC server is listening on ${port}`)
    }
});
