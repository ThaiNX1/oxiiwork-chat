import {gql} from "apollo-angular";

export const STORAGE_UPLOAD_FILE = gql`
mutation storageUploadFile($file: Upload!) {
  storageUploadFile(file: $file) {
    id
    name
    location
  }
}
`;

export const STORAGE_DOCUMENT_GEN_LINK_UPLOAD = gql`
mutation documentGenLinkUpload(
  $filename: String!
  $folderId: String!
  $mimetype: String!
  $override: Boolean!
) {
  documentGenLinkUpload(
    filename: $filename
    folderId: $folderId
    mimetype: $mimetype
    override: $override
  ) {
    path
    uploadUrl
  }
}
`;

export const STORAGE_DOCUMENT_SUCCESS_UPLOAD = gql`
mutation documentUploadFileSuccess(
  $filename: String!
  $folderId: String!
  $mimetype: String!
  $encoding: String!
  $path: String!
) {
  documentUploadFileSuccess(
    filename: $filename
    folderId: $folderId
    mimetype: $mimetype
    encoding: $encoding
    path: $path
  ) {
    id
    url
    folderId
    path
    name
  }
}
`;

export const STORAGE_GEN_URL_UPLOAD = gql`
mutation storageGeneratePresignedUrls($arguments: UploadFileArgs!) {
  storageGeneratePresignedUrls(arguments: $arguments) {
    data {
      id
      path
      presignedUrl
      url
    }
  }
}
`;

export const STORAGE_ACTIVE_USING_FILE = gql`
mutation storageActiveUsingFiles($ids: [String!]!) {
  storageActiveUsingFiles(ids: $ids) {
    count
    files {
      id
    }
    total
  }
}
`;
