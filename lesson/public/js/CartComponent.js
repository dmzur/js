Vue.component( 'cart', {
    data() {
        return {
            showCart: false,
            cartItems: [],
        }
    },
    methods: {
        addProduct( product ) {
            let find = this.cartItems.find( el => el.id_product === product.id_product );
            if ( find ) {
                this.$parent.putJson( `/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: 1 } )
                    .then( data => {
                        if ( data.result ) {
                            find.quantity++;
                        }
                    } )
            } else {
                let prod = Object.assign( { quantity: 1 }, product );
                this.$parent.postJson( `api/cart/${ product.id_product }/${ product.product_name }`, prod )
                    .then( data => {
                        if ( data.result ) {
                            this.cartItems.push( prod );
                        }
                    } )
            }
        },
        remove( product ) {
            if ( product.quantity > 1 ) {
                this.$parent.putJson( `/api/cart/${ product.id_product }/${ product.product_name }`, { quantity: -1 } )
                    .then( data => {
                        if ( data.result ) {
                            product.quantity--;
                        }
                    } )
            } else {
                this.$parent.delJson( `/api/cart/${ product.id_product }/${ product.product_name }`, product )
                    .then( data => {
                        if ( data.result ) {
                            this.cartItems.splice( this.cartItems.indexOf( product ), 1 );
                        } else {
                            console.log( 'error' );
                        }
                    } )
            }
        },
    },
    mounted() {
        this.$parent.getJson( `/api/cart` )
            .then( data => {
                for ( let el of data.contents ) {
                    this.cartItems.push( el )
                }
            } );
    },
    template: `<div>
<button class="btn-cart" type="button" @click="showCart = !showCart">??????????????</button>
        <div class="cart-block" v-show="showCart">
            <cart-item v-for="item of cartItems" :key="item.id_product" :cart-item="item" @remove="remove">
            </cart-item>
        </div>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="cart-item">
                    <div class="product-bio">
                        <img style="width: 100px;"  :src="cartItem.imgs" alt="Some img">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.price }} each</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>
    `
})