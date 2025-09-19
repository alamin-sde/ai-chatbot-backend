import mongoose from "mongoose"
import { MessageDataType } from "../types/message.type"
const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'assistant', 'system'],
        requered: true

    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    metaData: {
        tokens: Number,
        processingTime: Number,
        model: String
    }
})

const chatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sessionId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: 'New Conversation'
    },
    messages: [messageSchema],
    isActive: {
        type: Boolean,
        default: true
    },
    tags: [String],
    summary: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateddAt: {
        type: Date,
        default: Date.now()
    }

})
chatSchema.methods.addMessage = function (messageData: MessageDataType) {
    this.messages.push({
        role: messageData.role,
        content: messageData.content,
        timestamp: messageData.timestamp,
        metaData: messageData?.metaData ?? {}
    })

}
chatSchema.methods.getContext = function (limit: number = 10) {
    return this.messages.
        slice(limit * (-1)).map((msg: MessageDataType) => {
            return {
                role: msg.role,
                content: msg.content
            }
        })

}
module.exports = mongoose.model('Chat', chatSchema)
