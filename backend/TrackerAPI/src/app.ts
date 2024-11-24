
import errorHandler from "./middleware/errorHandler"
import express, {Application} from "express"
import cors from "cors"
import routerUser from './routes/userRoute'
import routerCategory from './routes/categoryRoute'
import routerTransaction from './routes/transactionRoute'
import routerHealth from "./routes/healthRoute"
import routerAccount from "./routes/accountRoute"
import authRoutes from "./routes/authRoute"
const app: Application = express()
app.use(express.json())
app.use(cors())

app.use("/webmob/api", routerCategory)
app.use("/webmob/api", routerTransaction)
app.use("/webmob/api", routerUser)
app.use("/webmob/api", routerHealth)
app.use("/webmob/api", routerAccount)
app.use("/webmob/api/auth", authRoutes);


app.use(errorHandler);

export default app
