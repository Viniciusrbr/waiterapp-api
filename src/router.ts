import path from 'node:path'

import { Router } from 'express'
import multer from 'multer'

import { cancelCategory } from './app/useCases/categories/cancelCategory'
import { createCategory } from './app/useCases/categories/createCategory'
import { listCategories } from './app/useCases/categories/listCategories'
import { cancelOrder } from './app/useCases/orders/cancelOrder'
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus'
import { createOrder } from './app/useCases/orders/createOrder'
import { listOrders } from './app/useCases/orders/listOrders'
import { cancelProduct } from './app/useCases/products/cancelProduct'
import { createProduct } from './app/useCases/products/createProduct'
import { listProducts } from './app/useCases/products/listProducts'
import { listProductsByCategories } from './app/useCases/products/listProductsByCategories'

export const router = Router()

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'))
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
    },
  }),
})

// List Categories
router.get('/categories', listCategories)

// Create Category
router.post('/categories', createCategory)

// Delete/Cancel Category
router.delete('/categories/:categoryId', cancelCategory)

// List Products
router.get('/products', listProducts)

// Create Product
router.post('/products', upload.single('image'), createProduct)

// Delete/Cancel Product
router.delete('/products/:productsId', cancelProduct)

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategories)

// List Orders
router.get('/orders', listOrders)

// Create Order
router.post('/orders', createOrder)

// Change Order Status
router.patch('/orders/:orderId', changeOrderStatus)

// Delete/Cancel Order
router.delete('/orders/:orderId', cancelOrder)
