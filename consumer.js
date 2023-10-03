const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})
const consumer = kafka.consumer({ groupId: 'test-group' })

const receiveMessage = async () => {
    try {
        await consumer.connect()

        await consumer.subscribe({topic: 'animals', fromBeginning: true})
        await consumer.run({
            eachMessage: ({ topic, message }) => {
                console.log({
                    value: message.value.toString(),
                    topic: topic.toString()
                })
            }
        })
        
    } catch (error) {
        console.log(`ERROR::::${error}`)
    }
}

receiveMessage()