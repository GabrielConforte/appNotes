import {createPool} from 'mysql2/promise'

export const pool = createPool({
    host:'localhost',
    user: 'root',
    password: '2060',
    port: 33060,
    database: 'notesdb'
})

