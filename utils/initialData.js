import { generateUserPassword } from "./bcrypt.js"
import 'dotenv/config';
const PORT = process.env.PORT || 8181;

const initialUsers = [
  {
    name: {
      first: 'Yotta',
      middle: 'A.',
      last: 'Terracotta',
    },
    email: 'yotta@terracotta.com',
    password: generateUserPassword('1yotta!Terracotta'),
    image: {
      url: `http://localhost:${PORT}/images/avatar_male.webp`,
      alt: 'Male avatar',
    },
    phone: '050-0000001',
    address: {
      country: 'USA',
      state: 'North Carolina',
      city: 'Charlotte',
      street: 'Maple St',
      houseNumber: 1,
      zip: 28269,
    },
    order_ids: [],
    isEmployee: true,
    isAdmin: true,
  },
  {
    name: {
      first: 'Laura',
      middle: '',
      last: 'Thompson',
    },
    email: 'lthompson@petme.com',
    password: generateUserPassword('L@thompson321'),
    image: {
      url: `http://localhost:${PORT}/images/avatar_female.svg`,
      alt: 'Female avatar',
    },
    phone: '012-345 6788',
    address: {
      country: 'USA',
      state: 'New York',
      city: 'New York City',
      street: '456 Oak St',
      houseNumber: 2,
      zip: 10001,
    },
    order_ids: [],
    isEmployee: true,
    isAdmin: false,
  },
  {
    name: {
      first: 'Peter',
      middle: '',
      last: 'Jones',
    },
    email: 'peterjones@test.com',
    password: generateUserPassword('peterJones!123'),
    image: {
      url: `http://localhost:${PORT}/images/avatar_uni.png`,
      alt: 'Avatar',
    },
    phone: '012-345 6787',
    address: {
      country: 'USA',
      state: 'Texas',
      city: 'Houston',
      street: '789 Pine St',
      houseNumber: 3,
      zip: 77001,
    },
    order_ids: [],
    isEmployee: false,
    isAdmin: false,
  }
]

const initialPets = [
  { name: 'Dogs' }, { name: 'Cats' }, { name: 'Birds' }, { name: 'Fish' }, { name: 'Rodents' }, { name: 'Reptiles' },
]

const initialCategories = [
  { name: 'Food', description: 'Pet food products that offer balanced nutrition for animals, including dry, wet, and specialized diet options for various types of pets. This includes grain-free, organic, or veterinary-approved formulas.' },
  { name: 'Treats', description: 'A range of tasty snacks designed for rewarding pets during training or as a treat. These include dental chews, training treats, rawhide bones, and species-specific snacks like catnip for cats or chew sticks for small mammals.' },
  { name: 'Toys', description: 'Interactive, durable, and entertaining products for pets that promote exercise and mental stimulation. Includes plush toys, squeaky toys, chew toys, laser pointers, and puzzle feeders tailored to different pet species..' },
  { name: 'Bedding & Furniture', description: 'Comfortable sleeping arrangements and furniture for pets, including beds, mats, hammocks, scratching posts, and pet-specific furniture like cat trees or small pet habitats.' },
  { name: 'Grooming Products', description: 'Essential care products to maintain pet hygiene, such as shampoos, brushes, nail clippers, ear cleaners, and deshedding tools. These products cater to different skin and fur types, including sensitive and medicated options.' },
  { name: 'Health & Wellness', description: 'Products aimed at supporting the overall health of pets, including vitamins, supplements, flea/tick prevention, dental care items, first aid kits, and specialized medications for common pet health issues.' },
  { name: 'Clothing & Accessories', description: 'Apparel and functional accessories designed for pets, such as sweaters, raincoats, booties, and harnesses. This category also includes decorative items like bandanas and seasonal costumes for pets.' },
  { name: 'Feeding & Watering Supplies', description: 'Bowls, dispensers, and feeders that help with portion control and hydration. Includes automatic feeders, water fountains, slow-feeder bowls, and portable travel bowls for pets.' },
  { name: 'Training & Behaviour Aids', description: 'Products that assist in training pets and modifying behavior. This includes training clickers, pee pads, litter boxes, calming collars, and gates or crates for managing pets indoors.' },
  { name: 'Travel & Outdoor Gear', description: 'Equipment and supplies that make traveling with pets safer and more comfortable, including carriers, car seat covers, pet strollers, life jackets, and outdoor gear like dog backpacks and outdoor kennels.' },
  { name: 'Pet Tech', description: 'Technology-focused products designed for pet care, including GPS trackers, activity monitors, smart collars, and interactive devices like treat dispensers and pet cameras that connect to apps.' },
]

const initialProducts = [
  {
    name: 'Dog Food',
    description: 'High-quality dog food for all breeds.',
    image: {
      url: 'https://example.com/images/dog_food.jpg',
      alt: 'Dog Food Image',
    },
    price: 50,
    stock: 150,
    category_id: `Food`,
    petType_id: [`Dogs`],
    discount: 0
  },
  {
    name: 'Cat Toy',
    description: 'Interactive toy for cats to keep them engaged.',
    image: {
      url: 'https://example.com/images/cat_toy.jpg',
      alt: 'Cat Toy Image',
    },
    price: 30,
    stock: 75,
    category_id: `Toys`,
    petType_id: [`Cats`],
    discount: 0
  },
  {
    name: 'Fish Tank',
    description: 'A large tank suitable for various fish species.',
    image: {
      url: 'https://example.com/images/fish_tank.jpg',
      alt: 'Fish Tank Image',
    },
    price: 200,
    stock: 20,
    category_id: `Bedding & Furniture`,
    petType_id: [`Fish`],
    discount: 0
  },
]
const initialCarts = [
  {
    user_id: `0`,
    products: [],
  },
  {
    user_id: `1`,
    products: [
      {
        isStocked: true,
        product_id: `Dog Food`,
        quantity: 1,
        price: 1
      }
    ]
  },
  {
    user_id: `2`,
    products: [
      {
        isStocked: true,
        product_id: `Fish Tank`,
        quantity: 1,
        price: 1
      },
      {
        isStocked: true,
        product_id: `Cat Toy`,
        quantity: 3,
        price: 1
      },
    ]
  },
]

const initialOrders = [
  {
    user_id: `0`,
    products: [
      {
        product_id: `Dog Food`,
        quantity: 1,
        price: 1
      }
    ],
    address: {},
    status: 'Complete',
    total: 1
  },
  {
    user_id: `1`,
    products: [
      {
        product_id: `Cat Toy`,
        quantity: 2,
        price: 2
      }
    ],
    address: {},
    status: 'Complete',
    total: 2
  },
  {
    user_id: `2`,
    products: [
      {
        product_id: `Dog Food`,
        quantity: 1,
        price: 1
      }
    ],
    address: {},
    status: 'Complete',
    total: 1
  }
]

export { initialUsers, initialPets, initialCategories, initialProducts, initialCarts, initialOrders };
