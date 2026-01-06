
const cars = [
    {
        brand: "maruti suzuki",
        models: [
            { "name": "alto", "type": "hatchback", "years": "2000–2023" },
            { "name": "alto k10", "type": "hatchback", "years": "2010–2020, 2022–present" },
            { "name": "wagon r", "type": "hatchback", "years": "1999–present" },
            { "name": "celerio", "type": "hatchback", "years": "2014–present" },
            { "name": "swift", "type": "hatchback", "years": "2005–present" },
            { "name": "baleno", "type": "hatchback", "years": "2015–present" },
            { "name": "ignis", "type": "hatchback", "years": "2017–present" },

            { "name": "dzire", "type": "sedan", "years": "2008–present" },
            { "name": "ciaz", "type": "sedan", "years": "2014–present" },

            { "name": "vitara brezza", "type": "suv", "years": "2016–2022" },
            { "name": "brezza", "type": "suv", "years": "2022–present" },
            { "name": "fronx", "type": "crossover suv", "years": "2023–present" },
            { "name": "s-cross", "type": "crossover suv", "years": "2015–2022" },
            { "name": "grand vitara", "type": "suv", "years": "2022–present" },

            { "name": "ertiga", "type": "mpv", "years": "2012–present" },
            { "name": "xl6", "type": "mpv", "years": "2019–present" },

            { "name": "eeco", "type": "van", "years": "2010–present" }
        ]
    },
    {
        brand: "tata motors",
        models: [
            { "name": "alto", "type": "hatchback", "years": "2000–2023" },
            { "name": "alto k10", "type": "hatchback", "years": "2010–2020, 2022–present" },
            { "name": "wagon r", "type": "hatchback", "years": "1999–present" },
            { "name": "celerio", "type": "hatchback", "years": "2014–present" },
            { "name": "swift", "type": "hatchback", "years": "2005–present" },
            { "name": "baleno", "type": "hatchback", "years": "2015–present" },
            { "name": "ignis", "type": "hatchback", "years": "2017–present" },

            { "name": "dzire", "type": "sedan", "years": "2008–present" },
            { "name": "ciaz", "type": "sedan", "years": "2014–present" },

            { "name": "vitara brezza", "type": "suv", "years": "2016–2022" },
            { "name": "brezza", "type": "suv", "years": "2022–present" },
            { "name": "fronx", "type": "crossover suv", "years": "2023–present" },
            { "name": "s-cross", "type": "crossover suv", "years": "2015–2022" },
            { "name": "grand vitara", "type": "suv", "years": "2022–present" },

            { "name": "ertiga", "type": "mpv", "years": "2012–present" },
            { "name": "xl6", "type": "mpv", "years": "2019–present" },

            { "name": "eeco", "type": "van", "years": "2010–present" }
        ]
    },
    {
        brand: "mahindra",
        models: [
            { "name": "xuv300", "type": "suv", "years": "2019–present" },
            { "name": "xuv700", "type": "suv", "years": "2021–present" },
            { "name": "thar", "type": "suv", "years": "2015–present" },
            { "name": "scorpio", "type": "suv", "years": "2002–present" },
            { "name": "bolero", "type": "suv", "years": "2000–present" },
            { "name": "marazzo", "type": "mpv", "years": "2018–present" },
            { "name": "maruti eeco", "type": "van", "years": "2010–present" },
            { "name": "tempo traveller", "type": "van", "years": "2000–present" }
        ]
    },
    {
        name: "toyota",
        models: [
            { "name": "etios", "type": "sedan", "years": "2010–2020" },
            { "name": "etios cross", "type": "hatchback", "years": "2014–2020" },
            { "name": "innova crysta", "type": "mpv", "years": "2016–present" },
            { "name": "fortuner", "type": "suv", "years": "2009–present" },
            { "name": "corolla altis", "type": "sedan", "years": "2001–2021" },
            { "name": "camry", "type": "sedan", "years": "2006–present" },
            { "name": "glanza", "type": "hatchback", "years": "2019–present" }
        ]
    },
    {
        name: "honda",
        models: [
            { "name": "brio", "type": "hatchback", "years": "2011–2018" },
            { "name": "brio amaze", "type": "sedan", "years": "2011–2018" },
            { "name": "jazz", "type": "hatchback", "years": "2009–2020" },
            { "name": "city", "type": "sedan", "years": "2003–present" },
            { "name": "city amaze", "type": "sedan", "years": "2014–present" },
            { "name": "wr-v", "type": "crossover suv", "years": "2017–present" }
        ]
    },
    {
        name: "nissan",
        models: [
            { "name": "micra", "type": "hatchback", "years": "2003–2020" },
            { "name": "sunny", "type": "sedan", "years": "2007–2020" },
            { "name": "magnite", "type": "suv", "years": "2020–present" },
            { "name": "kicks", "type": "suv", "years": "2019–present" },
            { "name": "terra", "type": "suv", "years": "2018–present" }
        ]
    },
    {
        name: "isuzu",
        models: [
            { "name": "d-max v-cross", "type": "pickup suv", "years": "2012–present" },
            { "name": "d-max", "type": "pickup suv", "years": "2002–present" },
            { "name": "mu-x", "type": "suv", "years": "2013–present" }
        ]
    },
    {
        name: "hyundai",
        models: [
            { "name": "santro", "type": "hatchback", "years": "1998–2018" },
            { "name": "grand i10", "type": "hatchback", "years": "2009–2019" },
            { "name": "i10 nios", "type": "hatchback", "years": "2017–present" },
            { "name": "i20", "type": "hatchback", "years": "2008–present" },
            { "name": "elite i20", "type": "hatchback", "years": "2014–2020" },

            { "name": "xcent", "type": "sedan", "years": "2014–2020" },
            { "name": "verna", "type": "sedan", "years": "2006–present" },

            { "name": "creta", "type": "suv", "years": "2015–present" },
            { "name": "alcazar", "type": "suv", "years": "2021–present" },

            { "name": "kona electric", "type": "suv", "years": "2019–present" }
        ]
    },
    {
        name: "kia",
        models: [
            { "name": "seltos", "type": "suv", "years": "2019–present" },
            { "name": "sonet", "type": "suv", "years": "2020–present" },
            { "name": "carnival", "type": "mpv", "years": "2020–present" }
        ]
    },
    {
        name: "volkswagen",
        models: [
            { "name": "polo", "type": "hatchback", "years": "2002–present" },
            { "name": "vento", "type": "sedan", "years": "2010–present" },
            { "name": "taigun", "type": "suv", "years": "2021–present" }
        ]
    },
    {
        name: "skoda",
        models: [
            { "name": "rapid", "type": "sedan", "years": "2011–present" },
            { "name": "slavia", "type": "sedan", "years": "2022–present" },
            { "name": "kushaq", "type": "suv", "years": "2021–present" }
        ]
    },
    {
        name: "renault",
        models: [
            { "name": "kwid", "type": "hatchback", "years": "2015–present" },
            { "name": "triber", "type": "mpv", "years": "2019–present" },
            { "name": "duster", "type": "suv", "years": "2012–present" },
            { "name": "logan", "type": "sedan", "years": "2007–2015" }
        ]
    },
    {
        name: "mg motors",
        models: [
            { "name": "hector", "type": "suv", "years": "2019–present" },
            { "name": "hector plus", "type": "mpv", "years": "2021–present" },
            { "name": "zs ev", "type": "suv", "years": "2020–present" },
            { "name": "astor", "type": "suv", "years": "2021–present" }
        ]

    }
]