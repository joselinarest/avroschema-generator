import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

export default {

    data() {
        return {
            trackingId: 'XX-XXXXXX'
        }
    },
    methods: {
        analytics(){

            return Analytics({
                app: 'avro-schema',
                plugins: [
                    googleAnalytics({
                        trackingId: this.trackingId
                    })
                ]
            })

        },
    },
}