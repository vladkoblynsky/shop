import { CheckoutPaymentPage } from '@temp/views/Checkout'
import { withApollo } from '@temp/core/withApollo'

export default withApollo({ ssr: false })(CheckoutPaymentPage)
