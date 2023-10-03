const { Kafka } = require('kafkajs')
const Chance = require('chance')

const chance = new Chance()
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})
const producer = kafka.producer()

const sendMessage = async () => {
    try {
        await producer.connect()
        
        setInterval( async () => {
            await producer.send({
                topic: 'animals',
                messages: [
                    {value: chance.string()}
                ]
            })
        }, 5000);
        await producer.disconnect()
    } catch (error) {
        console.log(`ERROR::::${error}`)
    }
}

sendMessage()