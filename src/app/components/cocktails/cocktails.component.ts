import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DrinksDataService } from 'src/app/services/drinks-data.service';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css']
})
export class CocktailsComponent implements OnInit {

  showLoader = false;
  dashBoardData = [];
  categoryFilters = [];
  glassesFilters = [];
  ingredientsFilters = [];
  alcoholicFilters = [];
  drinks = []
  search = {
    name: '',
    Ingredient: ''
  }
  filter = {
    category: '',
    glasses: '',
    ingrediant: '',
    alcoholic: ''
  }

  constructor(private drinksSrc: DrinksDataService) { }

  ngOnInit(): void {
    this.drinksSrc.loader.subscribe(data => {
      this.showLoader = data
    })

    this.loadDashboardData()
    this.drinksSrc.listFilters().subscribe(res => {
      if (res) {
        this.categoryFilters = res[0].drinks;
        this.glassesFilters = res[1].drinks;
        this.ingredientsFilters = res[2].drinks;
        this.alcoholicFilters = res[3].drinks;
      }
    })
  }

  resetFilterObject() {
    this.filter = {
      category: '',
      glasses: '',
      ingrediant: '',
      alcoholic: ''
    }
  }

  resetSearchObject() {
    this.search = {
      name: '',
      Ingredient: ''
    }
  }

  reset() {
    this.resetSearchObject();
    this.resetFilterObject();
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.drinksSrc.getDashboardData().subscribe(res => {
      if (res.drinks) {
        this.drinks = res.drinks
        let ingrediants = ''
        this.drinks.map(x => {
          Object.keys(x).map(key => {
            if (key.includes('Ingredient') && x[key]) {
              ingrediants = `${ingrediants} ${x[key]},`
            }
          })
          x['ingrediants'] = ingrediants;
          ingrediants = '';
        })
        this.dashBoardData = this.drinks;
      }
    })
  }

  sortData(sortBy) {
    this.drinks.sort((a, b) => a[sortBy] > b[sortBy] ? 1 : b[sortBy] > a[sortBy] ? -1 : 0)
  }

  filterData(event) {
    this.resetSearchObject();
    switch (event) {
      case "category":
        let catFilter = this.filter.category;
        this.drinksSrc.filterByCategory(catFilter).subscribe(res => this.drinks = res.drinks)
        this.resetFilterObject();
        this.filter.category = catFilter;
        break;

      case "glass":
        let glassFilter = this.filter.glasses;
        this.drinksSrc.filterByGlass(glassFilter).subscribe(res => this.drinks = res.drinks)
        this.resetFilterObject();
        this.filter.glasses = glassFilter;
        break;

      case "ingrediant":
        let ingFilter = this.filter.ingrediant;
        this.drinksSrc.filterByIngredient(ingFilter).subscribe(res => this.drinks = res.drinks)
        this.resetFilterObject();
        this.filter.ingrediant = ingFilter;
        break;

      case "alcoholic":
        let alcoFilters = this.filter.alcoholic;
        this.drinksSrc.filterByAlcoholic(alcoFilters).subscribe(res => this.drinks = res.drinks)
        this.resetFilterObject();
        this.filter.alcoholic = alcoFilters;
        break;
    }
  }

  // getFilterData(){

  // }

  searchByName() {
    this.resetFilterObject();
    if (this.search.name) {
      this.drinksSrc.searchByName(this.search.name).subscribe(res => {
        if (res) {
          this.drinks = res.drinks
        }
      })
    } else {
      this.drinks = this.dashBoardData;
    }
  }

  searchByIngredient() {
    this.resetFilterObject();
    if (this.search.Ingredient) {
      this.drinksSrc.searchByIngredient(this.search.Ingredient).subscribe(res => {
        if (res) {
          this.drinks = res.ingredients
        }
      })
    } else {
      this.drinks = this.dashBoardData;
    }
  }

  getPopularDrinks() {
    this.drinksSrc.getPopular().subscribe(res => {
      if (res) {
        this.drinks = [];
        this.drinks.push(res.drinks);
      }
    })
  }

  getLatestDrinks() {
    this.drinksSrc.getLatest().subscribe(res => {
      if (res) {
        this.drinks = [];
        this.drinks.push(res.drinks);
      }
    })
  }
}
