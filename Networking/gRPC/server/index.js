const PROTO_PATH ="./customers.proto";

const grpc = require("grpc");
const grpcProtoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
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
    get:(call,callback)=>{},
    insert:(call,callback)=>{},
    update:(call,callback)=>{},
    remove:(call, callback)=>{}
})

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
server.start();