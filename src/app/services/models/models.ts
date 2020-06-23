export class OrderPolis {
    id: string
    statusCT: string
    namaCT: string
    nomorKTPCT: string
    dobCT: any
    genderCT: string
    namaPP: string
    dobPP: any
    genderPP: string
    nomorTelponPP: string
    emailPP:string
    nomorKTPPP: string
    provinsi: string
    statusPM: string
    namaPM: string
    nomorKTPPM: string
    dobPM: any
    genderPM: string
    namaBank: string
    nomorBank: string
    pemilikBank: string
    product: string
    premi: string
    manfaat: string
}

export class Product {
    benefit: string
    deskripsi: string
    kode_produk: string
    nama_produk: string
}

export class Manfaat {
    id: number
    kode_produk: string
    manfaat: string
    pengecualian: string
    periode: string
}