export default {
    data() {
        return {
               mapping:[//Integer Types
                   { sql:'TINYINT' ,avro: 'int'},
                   {sql:'SMALLINT',avro:'int'},
                   {sql:'INT',avro:'int'},
                   {sql:'BIGINT',avro:'long'},
                    //Fixed-Point Types
                   {sql:'DECIMAL' ,avro:'float'},
                   {sql:'NUMERIC' ,avro:'double'},
                    //Floating-Point Types
                   {sql:'FLOAT' ,avro:'float'},
                   {sql:'DOUBLE',avro:'double'},
                   {sql:'BIT' ,avro:'boolean'},
                   //String Data Type
                   {sql:'CHAR',avro:'string'},
                   {sql:'VARCHAR' ,avro:'string'},
                   {sql:'BINARY' ,avro:'string'},
                   {sql:'VARBINARY' ,avro:'string'},
                   {sql:'TINYBLOB' ,avro:'string'},
                   {sql:'BLOB' ,avro:'string'},
                   {sql:'LONGBLOB' ,avro:'string'},
                   {sql:'TINYTEXT' ,avro:'string'},
                   {sql:'TEXT' ,avro:'string'},
                   {sql:'MEDIUMTEXT' ,avro:'string'},
                   {sql:'LONGTEXT' ,avro:'string'},
                   {sql:'ENUM' ,avro:'string'},
                   //date
                   {sql:'DATE' ,avro:'string'},
                   {sql:'TIME' ,avro:'string'},
                   {sql:'DATETIME' ,avro:'string'},
                   {sql:'TIMESTAMP' ,avro:'string'},
                   {sql:'YEAR' ,avro:'int'},
            ]
        }
    },
    methods: {
        getMappingType(sqlType){

            let search = sqlType.toUpperCase();
            let res = this.mapping.filter(c => c.sql.indexOf(search) > -1);
           return (res.length > 0) ? res[0].avro:'null'

        },
    },
};