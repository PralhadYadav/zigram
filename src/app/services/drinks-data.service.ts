import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment'
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';

const { apiUrl } = environment
@Injectable({
  providedIn: 'root'
})
export class DrinksDataService {

  loader = new BehaviorSubject(false);
  constructor(private http: HttpClient) { }

  showLoader(event) {
    this.loader.next(event)
  }

  getDashboardData(): Observable<any> {
    return this.http.get(`${apiUrl}/search.php?f=a`)
  }

  listFilters(): Observable<any> {
    let category = this.http.get(`${apiUrl}/list.php?c=list`)
    let glasses = this.http.get(`${apiUrl}/list.php?g=list`)
    let ingrediants = this.http.get(`${apiUrl}/list.php?i=list`)
    let alcoholics = this.http.get(`${apiUrl}/list.php?a=list`)
    return forkJoin([category, glasses, ingrediants, alcoholics])
  }

  getPopular(): Observable<any> {
    return this.http.get(`${apiUrl}/popular.php`)
  }

  getLatest(): Observable<any> {
    return this.http.get(`${apiUrl}/latest.php`)
  }

  searchByName(name): Observable<any> {
    return this.http.get(`${apiUrl}/search.php?s=${name}`)
  }

  searchByIngredient(ingredient): Observable<any> {
    return this.http.get(`${apiUrl}/search.php?i=${ingredient}`)
  }

  filterByCategory(category): Observable<any> {
    return this.http.get(`${apiUrl}/filter.php?c=${category}`)
  }

  filterByGlass(category): Observable<any> {
    return this.http.get(`${apiUrl}/filter.php?g=${category}`)
  }

  filterByIngredient(category): Observable<any> {
    return this.http.get(`${apiUrl}/filter.php?i=${category}`)
  }

  filterByAlcoholic(category): Observable<any> {
    return this.http.get(`${apiUrl}/filter.php?a=${category}`)
  }
}
