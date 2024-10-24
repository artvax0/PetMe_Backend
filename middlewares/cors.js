import cors from 'cors';

const mwCors = cors({
  origin: ['http://localhost:5173'],
})

export default mwCors;