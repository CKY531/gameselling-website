import {
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  Select,
  InputAdornment,
  Paper,
  CardMedia,
  MenuItem,
  InputLabel,
  FormControl,
  useMediaQuery,
  makeStyles,
} from "@material-ui/core";
import React, { useState, useMemo } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const initialProductList = [
  {
    photo: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",  //Photo image link
    name: "Cyberpunk2077",
    tags: ["RPG", "FPS"],
    price: "$400",
    imgPosition: "top",
    buyLink: "https://www.cyberpunk.net/us/en/pre-order",  //The link for you to buy the game
  },
  {
    photo: "https://upload.wikimedia.org/wikipedia/en/6/68/Bloodborne_Cover_Wallpaper.jpg",
    name: "BloodBorne",
    tags: ["RPG", "Action"],
    price: "$350",
    imgPosition: "top",
    buyLink: "https://store.playstation.com/en-us/product/UP9000-CUSA00900_00-BLOODBORNE000000",
  },
  {
    photo: "https://vignette.wikia.nocookie.net/starwars/images/5/57/Fallen-Order-Box-Art.jpg/revision/latest?cb=20190607015712",
    name: "Star Wars Fallen Order",
    tags: ["RPG", "Action"],
    price: "$500",
    imgPosition: "top",
    buyLink: "https://store.steampowered.com/app/1172380/STAR_WARS_Jedi_Fallen_Order/",
  },
  {
    photo: "https://upload.wikimedia.org/wikipedia/en/9/9d/State_of_Decay_2_art.jpg",
    name: "State Of Decay 2",
    tags: ["RPG", "Open World", "Survival"],
    price: "$300",
    imgPosition: "top",
    buyLink: "https://store.steampowered.com/app/495420/State_of_Decay_2_Juggernaut_Edition/",
  },
  {
    photo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Logo_of_Stardew_Valley.png/220px-Logo_of_Stardew_Valley.png",
    name: "Stardew Valley",
    tags: ["Simulation", "RPG"],
    price: "$50",
    imgPosition: "top",
    buyLink: "https://store.steampowered.com/app/413150/Stardew_Valley/",
  },
  {
    photo: "https://cdn-products.eneba.com/resized-products/UepwtOz_390x400_1x-0.jpg",
    name: "Civilization 5",
    tags: ["Simulation", "Strategy", "Turn-based"],
    price: "$350",
    imgPosition: "top",
    buyLink: "https://store.steampowered.com/app/8930/Sid_Meiers_Civilization_V/",
  },
];

const useAddItemStyles = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(2),
  },
  input: {
    marginTop: theme.spacing(2),
  }
}));
const Additem = ({ onSubmitAdd }) => {
  const classes = useAddItemStyles();

  const handlesubmit = () => {
    onSubmitAdd(link, imagePosition, name, tag, price, buyLink);
    setLink("");
    setName("");
    setTag("");
    setPrice("");
    setBuyLink("");
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [tag, setTag] = useState("");
  const [link, setLink] = useState("");
  const [imagePosition, setImagePosition] = useState("top");
  const [buyLink, setBuyLink] = useState("");

  return (
    <Box paddingLeft="10px">
      <Typography variant="h4" noWrap={true} className={classes.text}>
        Add item
      </Typography>
      <TextField
        label="Cover Link"
        className={classes.input}
        variant="outlined"
        id="AddLink"
        fullWidth
        value={link}
        onChange={(e) => {
          setLink(e.target.value);
        }}
      />
      <FormControl variant="outlined" fullWidth className={classes.input}>
        <InputLabel id="cover-select">Cover position</InputLabel>
        <Select
          labelId="cover-select"
          label="Cover position"
          id="select"
          value={imagePosition}
          onChange={(e) => {
            setImagePosition(e.target.value);
          }}
        >
          <MenuItem value="top">Top</MenuItem>
          <MenuItem value="center">Center</MenuItem>
          <MenuItem value="bottom">Bottom</MenuItem>
        </Select>
      </FormControl>
      <TextField
        className={classes.input}
        variant="outlined"
        id="AddName"
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextField
        className={classes.input}
        variant="outlined"
        id="AddPrice"
        fullWidth
        label="Price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <TextField
        className={classes.input}
        variant="outlined"
        id="AddTags"
        fullWidth
        label="Tags"
        value={tag}
        onChange={(e) => {
          setTag(e.target.value);
        }}
      />
      <TextField
        className={classes.input}
        variant="outlined"
        id="AddbuyLink"
        fullWidth
        label="Buy Link"
        value={buyLink}
        onChange={(e) => {
          setBuyLink(e.target.value);
        }}
      />
      <Button
        className={classes.input}
        variant="contained"
        size="medium"
        type="submit"
        color="primary"
        onClick={handlesubmit}
      >
        Add now!
      </Button>
    </Box>
  )
}

const useProductItemStyles = makeStyles((theme) => ({
  image: product => ({
    width: "100%",
    paddingTop: "100%",
    backgroundPosition: product.imgPosition,
  }),
  name: {
    paddingTop: "12px",
  },
  buyButton: {
    marginTop: "12px",
  },
}));
const ProductItem = ({ product, onClickBuy }) => {
  const classes = useProductItemStyles(product);

  const allTag = useMemo(() => {
    let tags = "";
    for (let tag of product.tags) {
      tags += `#${tag} `;
    }
    return tags;
  }, [product.tags]);

  return (
    <Box>
      <CardMedia className={classes.image} image={product.photo} />
      <Typography variant="h5" noWrap className={classes.name} >
        {product.name}
      </Typography>
      <Typography variant="h6">
        {product.price}
      </Typography>
      <Typography variant="subtitle1" noWrap>
        {allTag}
      </Typography>
      <Button size="small" variant="contained" color="primary" className={classes.buyButton} onClick={() => onClickBuy(product.buyLink)}>
        Buy
      </Button>
    </Box>
  );
}

const Search = ({ onSearch, onDelete }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box margin={2}>
      <TextField
        label="Search"
        variant="outlined"
        id="Searching"
        fullWidth
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          if (e.target.value.length === 0) {
            onDelete();
          } else {
            onSearch(e.target.value);
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <ClearIcon
                onClick={() => {
                  setSearchValue("");
                  onDelete();
                }}
              />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  )
};

const useAppStyles = makeStyles((theme) => ({
  layout: {
    paddingLeft: "5%",
    paddingRight: "10%",
    minHeight: "100vh",
  },
  paper: {
    marginLeft: "10%",
    marginRight: "10%",
  },
}))
const App = () => {
  const classes = useAppStyles();

  const isXS = useMediaQuery(theme => theme.breakpoints.only("xs"));

  const [products, setProducts] = useState(initialProductList);
  const [totalProducts, setTotalProducts] = useState(initialProductList);

  const renderContent = () => {
    return (
      <Grid container spacing={4} className={classes.layout}>
        <Grid item xs={12} sm={4}>
          <Additem
            onSubmitAdd={(Link, imagePosition, Name, Tags, Price, BuyLink) => {
              if (Link && imagePosition && Name && Tags && Price && BuyLink) {
                const newProducts = [...products,
                {
                  photo: Link,
                  name: Name,
                  tags: Tags.split(" "),
                  price: Price,
                  imgPosition: imagePosition,
                  buyLink: BuyLink,
                }
                ];
                setTotalProducts(newProducts);
                setProducts(newProducts);
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Search
            onSearch={(text) => {
              const newProductsList = products.filter(product => product.name.toLowerCase().includes(text.toLowerCase()));
              setProducts(newProductsList);
            }}
            onDelete={() => {
              setProducts(totalProducts);
            }}
          />
          <Grid container spacing={4}>
            {products.length === 0 ? (
              <Box display="flex" justifyContent="center" width="100%" marginTop="10%">
                <Typography variant="h4">
                  No items found
                </Typography>
              </Box>
            ) : products.map(product => (
              <Grid item xs={6} sm={4}>
                <ProductItem
                  product={product}
                  onClickBuy={(buyLink) => window.open(buyLink)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    )
  };

  return isXS ? renderContent() : (
    <Paper className={classes.paper} elevation="10" >
      {renderContent()}
    </Paper>
  );
}

export default App;