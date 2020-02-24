module.exports = {

    // REGEX
    // match name, only match alphabet, apostrophe, and dash
    nameRE: /^[a-z'][a-z\s'-.]+[a-z.]$/i,

    // referensi https://id.wikipedia.org/wiki/Nomor_Induk_Kependudukan
    // idRE: new RegExp([
    //     '^([1-9]{2})', // match kode provinsi
    //     '([1-9][0-9]|0[1-9]){2}', // match kode kota dan kecamatan
    //     '(([0-246][0-9])|([37][01]))', // match tanggal lahir
    //     '(0[1-9]|1[0-2])', // match bulan lahir
    //     '([0-9]{2})', // match tahun lahir
    //     '(\d{4})$' // match nomor urut
    // ].join('')),
    idRE : /^\d{16}$/,

    // idRE: new RegExp([
    //     '^[1-9]{2}', // match kode provinsi
    //     '([1-9][0-9]|0[1-9]){2}', // match kode kota dan kecamatan
    //     '(([0-246][0-9])|([37][01]))', // match tanggal lahir
    //     '(0[1-9]|1[0-2])', // match bulan lahir
    //     '([0-9]{2})', // match tahun lahir
    //     '(\d{4})$' // match nomor urut
    // ].join('')),

    // messages
    invalidName: {"message":"Invalid name"},
    invalidId: {"message": "Invalid ID"},
    notFound: {"message": "no user found"}
};