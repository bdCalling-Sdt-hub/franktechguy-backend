
type IFolderName =
  | 'image'
  | 'license'
  | 'driverLicense'
  | 'insurance'
  | 'permits'
  | 'banner'
  | 'logo'
  | 'audio'
  | 'video'
  | 'document'
  | 'others';


export const getSingleFilePath = (files: any, folderName: IFolderName) => {
  if (!files) return undefined;
  
  const fileField = files[folderName];
  if (fileField && Array.isArray(fileField) && fileField.length > 0) {
    return `/${folderName}/${fileField[0].filename}`;
  }

  return undefined;
};


export const getMultipleFilesPath = (files: any, folderName: IFolderName) => {
  if (!files) return undefined;
  
  const folderFiles = files[folderName];
  if (folderFiles && Array.isArray(folderFiles) && folderFiles.length > 0) {
    return folderFiles.map((file: any) => `/${folderName}/${file.filename}`);
  }

  return undefined;
};


export const getAllFilePaths = (files: any) => {
  if (!files) return {};
  
  const result: Record<string, string | string[] | undefined> = {};

  Object.keys(files).forEach((folderName) => {
    const folderFiles = files[folderName];
    
    if (folderFiles && Array.isArray(folderFiles)) {
      if (folderFiles.length === 1) {
        result[folderName] = `/${folderName}/${folderFiles[0].filename}`;
      } else if (folderFiles.length > 1) {
        result[folderName] = folderFiles.map(
          (file: any) => `/${folderName}/${file.filename}`
        );
      }
    }
  });
  
  return result;
};


export const getFilePathWithBaseDir = (
  files: any, 
  folderName: IFolderName, 
  baseDir: string = ''
) => {
  if (!files) return undefined;
  
  const fileField = files[folderName];
  if (fileField && Array.isArray(fileField) && fileField.length > 0) {
    const formattedBaseDir = baseDir ? 
      (baseDir.endsWith('/') ? baseDir : `${baseDir}/`) : 
      '';
    
    return `${formattedBaseDir}${folderName}/${fileField[0].filename}`;
  }

  return undefined;
};