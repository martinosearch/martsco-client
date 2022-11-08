export class MyFile {
    static FILE = 'application/octet-stream';
    static PDF_TYPE = 'application/pdf';
    static XLS_TYPE = 'application/vnd.ms-excel';
    static XLSX_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    static DOCX_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    id: number;
    name: string;
    contentType: string;
    fileAsBase64 = "";
    size: number;
}
