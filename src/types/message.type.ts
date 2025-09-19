export type MetaDataType = {
    tokens: Number,
    processingTime: Number,
    model: String
}
export type MessageDataType = {
    role: string,
    content: string,
    timestamp: Date,
    metaData: MetaDataType

}
