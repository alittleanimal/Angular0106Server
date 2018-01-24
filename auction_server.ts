import * as express from 'express'

const app = express();

export class Product {

    constructor(public id: number,
        public title: string,
        public price: number,
        public rating: number,
        public desc: string,
        public categories: Array<string>) {

    }
}

export class Comment {
    constructor(public id: number,
        public productId: number,
        public timestamp: string,
        public user: string,
        public rating: number,
        public content: string) {
    }
}

const products: Product[] = [
    new Product(1, '第一个商品', 1.99, 3.5, '这是第一个商品，Angular实战', ['电子产品', '硬件设备']),
    new Product(2, '第二个商品', 2.99, 4.5, '这是第二个商品，Angular实战', ['图书']),
    new Product(3, '第三个商品', 3.99, 1.5, '这是第三个商品，Angular实战', ['电子产品', '硬件设备']),
    new Product(4, '第四个商品', 4.99, 4.5, '这是第四个商品，Angular实战', ['硬件设备']),
    new Product(5, '第五个商品', 5.99, 2.5, '这是第五个商品，Angular实战', ['电子产品', '硬件设备']),
];

const comments: Comment[] = [
    new Comment(1, 1, "2017-02-02 22:22:22", "张三", 3, "good"),
    new Comment(2, 1, "2017-02-02 22:22:22", "李四", 4, "good"),
    new Comment(3, 1, "2017-02-02 22:22:22", "王五", 2, "good"),
    new Comment(4, 2, "2017-02-02 22:22:22", "周六", 5, "good"),
]


app.get('/', (req, res) => {
    res.send("Hello Express");
})

app.get('/api/products', (req, res) => {
    let result = products;
    let params = req.query;

    if(params.title){
        result = result.filter((p) => p.title.indexOf(params.title) !== -1);
    }

    if(params.price && result.length>0){
        result = result.filter((p) => p.price <= parseInt(params.price));
    }

    if(params.category !== "-1" && result.length>0){
        result = result.filter((p) => p.categories.indexOf(params.category) !== -1);
    }

    res.json(products);
})

app.get('/api/product/:id', (req, res) => {
    res.json(products.find((product) =>
        product.id == req.params.id
    ));
})

app.get('/api/product/:id/comments', (req, res) => {
    res.json(
        comments.filter((comment: Comment) => comment.productId == req.params.id)
    );
})

const serve = app.listen(8000, "localhost", () => {
    console.log("服务器已启动， 地址是： http://localhost:8000");
})