import { rest } from 'msw'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'

const productsRes = {
  message: 'Lấy các sản phẩm thành công',
  data: {
    products: [
      {
        _id: '60afb2c76ef5b902180aacba',
        images: [
          'https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg',
          'https://api-ecom.duthanhduoc.com/images/6c4f6bde-6242-40fd-be52-d06033636e04.jpg',
          'https://api-ecom.duthanhduoc.com/images/1385ed69-6843-4edb-a1fb-e5fc795a99e5.jpg',
          'https://api-ecom.duthanhduoc.com/images/7f4f7a5b-b003-462a-a6b9-c0e69175def3.jpg',
          'https://api-ecom.duthanhduoc.com/images/1c323bdd-c0ef-4538-b09d-34c1a4478baa.jpg',
          'https://api-ecom.duthanhduoc.com/images/5054f46f-d317-40f6-a804-6b22dc92e946.jpg',
          'https://api-ecom.duthanhduoc.com/images/eed30991-df2d-41b5-afb2-697a06ba3299.jpg',
          'https://api-ecom.duthanhduoc.com/images/2922fee1-448c-4302-bcc2-804e0fe44f84.jpg',
          'https://api-ecom.duthanhduoc.com/images/84f7bf91-685c-4be9-bd8c-1f0a4e2e21c3.jpg'
        ],
        price: 3190000,
        rating: 4.6,
        price_before_discount: 3990000,
        quantity: 138,
        sold: 1200,
        view: 47062,
        name: 'Điện Thoại Vsmart Active 3 6GB/64GB - Hàng Chính Hãng',
        category: {
          _id: '60afafe76ef5b902180aacb5',
          name: 'Điện thoại',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg',
        createdAt: '2021-05-27T14:55:03.113Z',
        updatedAt: '2023-06-17T14:09:47.010Z'
      },
      {
        _id: '60afb2426ef5b902180aacb9',
        images: [
          'https://api-ecom.duthanhduoc.com/images/aa374023-7a5b-46ea-aca3-dad1b29fb015.jpg',
          'https://api-ecom.duthanhduoc.com/images/b997dac2-2674-4e20-b5ee-459566b077e7.jpg',
          'https://api-ecom.duthanhduoc.com/images/ac328d77-6014-4a2d-8626-924ac35876df.jpg',
          'https://api-ecom.duthanhduoc.com/images/5061fefa-bded-4fb0-80e5-3623656a4816.jpg',
          'https://api-ecom.duthanhduoc.com/images/02c08a86-4d9b-437b-ae02-f1d49cf2933b.jpg',
          'https://api-ecom.duthanhduoc.com/images/12c405e3-b24f-46ef-8969-54050e1022e9.jpg',
          'https://api-ecom.duthanhduoc.com/images/d448057c-3d3d-45d2-a9bc-e984bc80555f.jpg'
        ],
        price: 2590000,
        rating: 4.2,
        price_before_discount: 3490000,
        quantity: 73,
        sold: 6800,
        view: 20572,
        name: 'Điện thoại OPPO A12 (3GB/32GB) - Hàng chính hãng',
        category: {
          _id: '60afafe76ef5b902180aacb5',
          name: 'Điện thoại',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/aa374023-7a5b-46ea-aca3-dad1b29fb015.jpg',
        createdAt: '2021-05-27T14:52:50.392Z',
        updatedAt: '2023-06-17T13:40:39.701Z'
      },
      {
        _id: '60afb1c56ef5b902180aacb8',
        images: [
          'https://api-ecom.duthanhduoc.com/images/a7fb7a18-743a-42bb-bead-36370c1d1aba.jpg',
          'https://api-ecom.duthanhduoc.com/images/b09ff60d-c6bd-4d3a-b778-0fc2708a65fb.jpg',
          'https://api-ecom.duthanhduoc.com/images/fc5ecd4c-47eb-4f12-ae82-ef26fd492887.jpg',
          'https://api-ecom.duthanhduoc.com/images/a87f854d-37a9-4252-a2f7-243fc21f8b55.jpg',
          'https://api-ecom.duthanhduoc.com/images/3ecf878d-6742-43d4-abe7-044c15c84120.jpg'
        ],
        price: 20990000,
        rating: 5,
        price_before_discount: 26990000,
        quantity: 17,
        sold: 482,
        view: 10636,
        name: 'Điện thoại Apple Iphone 12 64GB - Hàng chính hãng VNA',
        category: {
          _id: '60afafe76ef5b902180aacb5',
          name: 'Điện thoại',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/a7fb7a18-743a-42bb-bead-36370c1d1aba.jpg',
        createdAt: '2021-05-27T14:50:45.708Z',
        updatedAt: '2023-06-17T10:25:31.706Z'
      },
      {
        _id: '60afb14d6ef5b902180aacb7',
        images: [
          'https://api-ecom.duthanhduoc.com/images/51ef469d-0eb5-48fb-958d-ce2b9c664adc.jpg',
          'https://api-ecom.duthanhduoc.com/images/32d2b004-6a6c-4605-af12-8f8f2e4f6aff.jpg',
          'https://api-ecom.duthanhduoc.com/images/00f74b87-0750-4cc9-9b91-24907a2b1721.jpg',
          'https://api-ecom.duthanhduoc.com/images/f08f305b-e237-444d-9f1e-430ce15acd96.jpg',
          'https://api-ecom.duthanhduoc.com/images/2442b133-7801-47a5-ae7d-5fc5196a1a51.jpg',
          'https://api-ecom.duthanhduoc.com/images/19a98c2f-3ab4-4d72-bbc9-3525fd89859c.jpg',
          'https://api-ecom.duthanhduoc.com/images/9123a99f-e71c-49e7-a87b-974541fcb607.jpg'
        ],
        price: 2130000,
        rating: 5,
        price_before_discount: 2690000,
        quantity: 269,
        sold: 5600,
        view: 4637,
        name: 'Điện Thoại Realme C11 (2GB/32GB) - Hàng Chính Hãng',
        category: {
          _id: '60afafe76ef5b902180aacb5',
          name: 'Điện thoại',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/51ef469d-0eb5-48fb-958d-ce2b9c664adc.jpg',
        createdAt: '2021-05-27T14:48:45.577Z',
        updatedAt: '2023-06-17T08:29:32.394Z'
      },
      {
        _id: '60afb07e6ef5b902180aacb6',
        images: [
          'https://api-ecom.duthanhduoc.com/images/4e9c8364-7604-4b61-8658-9f18655bae40.jpg',
          'https://api-ecom.duthanhduoc.com/images/794c2b24-922a-4cc2-8c24-87551af917df.jpg',
          'https://api-ecom.duthanhduoc.com/images/e5ae5753-c153-4a29-9254-48cde48f814f.jpg',
          'https://api-ecom.duthanhduoc.com/images/24ceb22a-d9a2-4936-a53d-1d8c508b5eeb.jpg',
          'https://api-ecom.duthanhduoc.com/images/db1900e0-245c-437f-9e7e-9a5f15045d0f.jpg',
          'https://api-ecom.duthanhduoc.com/images/d4be2e97-e131-4cc6-93ed-432593ba9245.jpg',
          'https://api-ecom.duthanhduoc.com/images/1866d116-06a0-4657-936e-256c8ed09bd0.jpg',
          'https://api-ecom.duthanhduoc.com/images/77c6c7ec-25dc-4d5e-b572-22e7916c1cb2.jpg',
          'https://api-ecom.duthanhduoc.com/images/6492ca72-6451-414c-8653-f31693ebe1e6.jpg'
        ],
        price: 1949000,
        rating: 5,
        price_before_discount: 1990000,
        quantity: 409,
        sold: 1000,
        view: 3714,
        name: 'Điện Thoại Xiaomi Redmi 9A 2GB/32GB - Hàng Chính Hãng',
        category: {
          _id: '60afafe76ef5b902180aacb5',
          name: 'Điện thoại',
          __v: 0
        },
        image: 'https://api-ecom.duthanhduoc.com/images/4e9c8364-7604-4b61-8658-9f18655bae40.jpg',
        createdAt: '2021-05-27T14:45:18.517Z',
        updatedAt: '2023-06-17T10:46:24.540Z'
      }
    ],
    pagination: {
      page: 1,
      limit: 5,
      page_size: 9
    }
  }
}

const productDetailRes = {
  message: 'Lấy sản phẩm thành công',
  data: {
    _id: '60afb1c56ef5b902180aacb8',
    images: [
      'https://api-ecom.duthanhduoc.com/images/a7fb7a18-743a-42bb-bead-36370c1d1aba.jpg',
      'https://api-ecom.duthanhduoc.com/images/b09ff60d-c6bd-4d3a-b778-0fc2708a65fb.jpg',
      'https://api-ecom.duthanhduoc.com/images/fc5ecd4c-47eb-4f12-ae82-ef26fd492887.jpg',
      'https://api-ecom.duthanhduoc.com/images/a87f854d-37a9-4252-a2f7-243fc21f8b55.jpg',
      'https://api-ecom.duthanhduoc.com/images/3ecf878d-6742-43d4-abe7-044c15c84120.jpg'
    ],
    price: 20990000,
    rating: 5,
    price_before_discount: 26990000,
    quantity: 17,
    sold: 482,
    view: 10639,
    name: 'Điện thoại Apple Iphone 12 64GB - Hàng chính hãng VNA',
    description:
      '<p>H&agrave;ng Ch&iacute;nh h&atilde;ng m&atilde; VN/A, mới 100%, chưa k&iacute;ch hoạt</p><p>iPhone 12 64GB- Sự n&acirc;ng cấp chỉnh chu cho thế hệ tiền nhiệm<br />M&agrave;n h&igrave;nh iPhone 12 64GB - N&acirc;ng cấp đ&aacute;ng gi&aacute; từ tấm nền OLED<br />Hai năm qua, Apple vẫn trung th&agrave;nh với tấm nền IPS LCD d&agrave;nh cho c&aacute;c phi&ecirc;n bản điện thoại gi&aacute; rẻ. Trong đ&oacute;, iPhone XR, iPhone 11 v&agrave; thậm ch&iacute; l&agrave; SE 2020 l&agrave; những đại diện ti&ecirc;u biểu. Thế nhưng, điều n&agrave;y sẽ thay đổi khi m&agrave; giờ đ&acirc;y, thế hệ kế nhiệm đ&atilde; được n&acirc;ng cấp l&ecirc;n tấm nền OLED sắc n&eacute;t.</p><p>iPhone 12 64GB sở hữu m&agrave;n h&igrave;nh 6,1 inch (tương tự XR v&agrave; 11) với tấm nền OLED XDR tương tự c&aacute;c bản cao cấp. Ngo&agrave;i ra, một điểm nổi bật kh&ocirc;ng thể kh&ocirc;ng nhắc đến ch&iacute;nh l&agrave; việc n&acirc;ng cấp độ ph&acirc;n giải chuẩn HD+ vốn bị c&aacute;c fan đ&aacute;nh gi&aacute; k&eacute;m qua hai thế hệ l&ecirc;n chuẩn Full HD+. Do đ&oacute;, Cupertino đ&atilde; ch&iacute;nh thức thay đổi điểm yếu cố hữu tr&ecirc;n c&aacute;c phi&ecirc;n bản gi&aacute; rẻ của h&atilde;ng. Ngay cả bản 5,4 inch cũng được trang bị tấm nền OLED Super Retina.</p><p>Ngo&agrave;i ra, theo c&ocirc;ng bố của h&atilde;ng, m&agrave;n h&igrave;nh của thế hệ mới sẽ c&oacute; độ s&aacute;ng l&ecirc;n tới 1200 knits v&agrave; hỗ trợ c&aacute;c c&ocirc;ng nghệ HDR v&agrave; Dolby Vision. Đặc biệt, lớp k&iacute;nh sẽ được phủ một lớp &ldquo;Ceramic Shield&rdquo; gi&uacute;p m&aacute;y cứng c&aacute;p v&agrave; sống s&oacute;t cao hơn trong những t&igrave;nh huống &ldquo;tiếp đất&rdquo;.</p><p>Thiết kế iPhone 12 64GB mang n&eacute;t ho&agrave;i cổ<br />Năm nay c&aacute;c sản phẩm &ldquo;t&aacute;o khuyết&rdquo; đều sở hữu chung ng&ocirc;n ngữ thiết kế. Đ&oacute; l&agrave; sự kết hợp giữa iPhone 11 v&agrave; iPhone 5 với c&aacute;c cạnh viền được l&agrave;m vu&ocirc;ng vức hơn. Mặt trước vẫn l&agrave; m&agrave;n h&igrave;nh với notch &ldquo;tai thỏ&rdquo; chứa camera selfie v&agrave; Face ID. Thiết kế n&agrave;y khiến series smartphone năm nay của nh&agrave; T&aacute;o tr&ocirc;ng sang trọng v&agrave; mang d&aacute;ng dấp ho&agrave;i cổ từ ng&ocirc;n ngữ thiết kế của thế hệ thứ 5 trước đ&acirc;y.<br />C&ograve;n mặt sau của m&aacute;y vẫn sẽ l&agrave; một cụm m&aacute;y ảnh k&eacute;p đặt trong khung vu&ocirc;ng tương tự như thế hệ năm 2019. Do l&agrave; bản ti&ecirc;u chuẩn, thiết bị sẽ c&oacute; khung l&agrave;m từ nh&ocirc;m thay v&igrave; bằng th&eacute;p kh&ocirc;ng gỉ như bản cao cấp.</p><p>Hiệu năng iPhone 12 64GB mạnh mẽ<br />Cung cấp sức mạnh cho m&aacute;y ch&iacute;nh l&agrave; chip A14 Bionic. Theo c&ocirc;ng bố của Cupertino, A14 l&agrave; vi xử l&yacute; c&oacute; tới 6 nh&acirc;n CPU, chứa hơn 11,8 tỷ b&oacute;ng b&aacute;n dẫn, hứa hẹn sẽ cho hiệu năng hơn khoảng 40% so với A13. Điểm số benchmark của một mẫu m&aacute;y cũng sở hữu chipset n&agrave;y l&agrave; iPad Air 4 đ&atilde; cho thấy A14 thật sự vượt trội. Điểm số đơn nh&acirc;n 1583 va đa nh&acirc;n l&agrave; 4918, chỉ thua k&eacute;m một ch&uacute;t so với A12Z tr&ecirc;n iPad Pro 2020.<br />Ngo&agrave;i ra, nh&agrave; T&aacute;o c&ograve;n trang bị th&ecirc;m chip U1 với băng tần rộng (ultra-wideband) cho ph&eacute;p định vị vị tr&iacute; th&ocirc;ng qua AirDrop v&agrave; kết nối c&aacute;c thiết bị c&ugrave;ng hệ sinh th&aacute;i trong gia đ&igrave;nh</p><p>Camera iPhone 12 64GB - Thay đổi đến từ b&ecirc;n trong <br />Du l&agrave; thế hệ kế nhiệm iPhone 11, thế nhưng thiết bị n&agrave;y kh&ocirc;ng c&oacute; cải tiến nhiều về m&aacute;y ảnh. M&aacute;y vẫn sở hữu cụm camera k&eacute;p với 2 cảm biến 12MP (1 g&oacute;c rộng v&agrave; 1 g&oacute;c si&ecirc;u rộng). Apple đ&atilde; sắp xếp lại v&agrave; bổ sung th&ecirc;m thấu k&iacute;nh để cho chất lượng ảnh chụp trong v&agrave; sắc n&eacute;t hơn.</p>',
    category: {
      _id: '60afafe76ef5b902180aacb5',
      name: 'Điện thoại',
      __v: 0
    },
    image: 'https://api-ecom.duthanhduoc.com/images/a7fb7a18-743a-42bb-bead-36370c1d1aba.jpg',
    createdAt: '2021-05-27T14:50:45.708Z',
    updatedAt: '2023-06-17T15:22:10.033Z'
  }
}

const productsRequest = rest.get(`${config.baseUrl}products`, (_, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(productsRes))
})

const productDetailRequest = rest.get(`${config.baseUrl}products/:id`, (_, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(productDetailRes))
})

const productRequests = [productsRequest, productDetailRequest]
export default productRequests
