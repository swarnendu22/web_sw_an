const FileTypeObj = {
    pdf: 'application/pdf',
    jpeg: 'application/jpeg',
    jpg: 'application/jpg',
    png: 'application/png'
}


export async function getFileFromUrl(src) {
    console.log('src', src)
    let file = src.split('/').pop();
    let fileSplit = file.split('.');
    let fileType = FileTypeObj[fileSplit[1]];
    const res = await fetch(src).then(res => res.blob());
    let fileObj = new File([res], fileSplit[0], { type: fileType })
    console.log('file_func', fileObj)
    return fileObj;

}


export function replaceUrlImgix(storeLogoUrl) {
    if (storeLogoUrl && storeLogoUrl.indexOf('https') == 0) {
        let img = "";
        let x = storeLogoUrl.split('/');
        if (x.length >= 3) {
            if (x[2].includes('ndhbucket'))
                x[2] = 'ndh.imgix.net';
            img = x.join('/');
            img = `${img}?w=40&h=40`
            return img;
        }
    }
}