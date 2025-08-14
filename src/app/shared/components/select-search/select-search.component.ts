import {Component, EventEmitter, Input, OnInit, Output, Self, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl} from '@angular/forms';
import {Apollo} from 'apollo-angular';
import {Query} from '../../../commons/types';
import {debounceTime, map} from 'rxjs/operators';
import * as _ from 'lodash';
import {lastValueFrom} from "rxjs";
import {GQL_QUERIES} from "../../../core/constants/service-gql";

@Component({
  selector: 'select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
})
export class SelectSearchComponent implements OnInit, ControlValueAccessor {
  @Input() valueKey!: string;
  @Input() labelKey!: string;
  @Input() placeholder!: string;
  @Input() placeholderBoldStyle = false;
  @Input() apiPath!: string;
  @Input() apiObjSearchKey!: string;
  @Input() objSearch: any;
  @Input() otherObjSearch: any;
  @Input() apiObjResponseKey!: string;
  @Input() apiObjDataSourceKey!: string;
  @Input() disabled!: boolean;
  @Input() datasource!: any[];
  @Input() required = false;
  @Input() clear = true;
  @Input() showSearch = true;
  @Input() characterView!: string;
  @Input() fieldView1!: string;
  @Input() fieldView2!: string;
  @Input() pageSearch: number = 0;
  @Output() objectSelected = new EventEmitter();
  cloneDatasource: any = [];

  formControl: FormControl;
  formControlSearch: FormControl;
  itemSelected: any = null

  onChange = (value: any) => {
  };
  onTouched = () => {
  };
  value = null;

  constructor(
    private apollo: Apollo,
    @Self() public controlDir: NgControl
  ) {
    this.formControl = new FormControl();
    this.formControlSearch = new FormControl();
    controlDir.valueAccessor = this;
  }

  ngOnInit(): void {
    // this.formControl.reset();
    this.formControl.setValidators(this.controlDir.control?.validator || null);
    this.formControl.setValue(this.controlDir.control?.value);
    this.formControlSearch.setValue(null);
  }

  ngDoCheck() {
    if (!this.controlDir.control?.touched) {
      this.formControl.markAsUntouched({onlySelf: true});
    }
    if (this.formControl.touched) {
      return;
    }
    if (this.controlDir.control?.touched) {
      this.formControl.markAsTouched();
    }
  }

  ngOnChanges(): void {
    this.cloneDatasource = _.cloneDeep(this.datasource) || [];
  }

  getValueByKeyPath(obj: any, path: string) {
    const pathSplit = path.split('.');
    return pathSplit.reduce((value, key) => value?.[key], Object(obj));
  }

  registerOnChange(fn: any): void {
    this.formControl.valueChanges.subscribe(fn);
    this.formControl.valueChanges.subscribe((value) => {
      if (!value)
        this.itemSelected = null
      else
        this.itemSelected = this.cloneDatasource?.find((it: any) => it[this.valueKey] === value)
    })
    this.formControlSearch.valueChanges.pipe(debounceTime(300)).subscribe(async (valueSearch) => {
      if (this.apiPath?.length) {
        if (valueSearch) {
          await this.getValues(valueSearch);
        } else {
          this.datasource = this.cloneDatasource;
        }
      } else {
        this.datasource = this.cloneDatasource.filter((item: any) => item[this.labelKey]?.toLowerCase()?.includes(valueSearch?.toLowerCase() || ''));
      }
    });
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.formControl.setValue(obj);
    this.onChange(obj);
  }

  async getValues(keyword?: string) {
    // const apiPathSplits = this.apiPath.split('.')
    try {
      let request = {
        keyword: keyword,
        page: this.pageSearch,
        size: 20
      };
      if (this.objSearch) {
        request = {
          ...request,
          ...this.objSearch
        };
      }
      let _variables = {
        [this.apiObjSearchKey || 'filter']: {
          ...request
        }
      };
      if (this.otherObjSearch) {
        _variables = {
          ..._variables,
          ...this.otherObjSearch
        };
      }
      const response = await lastValueFrom(this.apollo.query<Query>({
        query: this.getValueByKeyPath(GQL_QUERIES, this.apiPath?.toString()),
        variables: _variables,
        fetchPolicy: 'no-cache'
      })
        .pipe(map((res: any) => res.data[this.apiObjResponseKey])))
      let _dataSource = []
      if (response) {
        const checkItemSelected = response[this.apiObjDataSourceKey]?.find((it: any) => it[this.valueKey] === this.itemSelected?.[this.valueKey])
        if (this.itemSelected && !checkItemSelected)
          _dataSource = [
            ...response[this.apiObjDataSourceKey],
            this.itemSelected
          ]
        else _dataSource = response[this.apiObjDataSourceKey]
      }
      this.datasource = _dataSource
    } catch (err) {
      this.datasource = [];
    }
  }

  handleInputControl(event: any): void {
    event.stopPropagation();
  }

  onSelectionChange(event: any) {
    const item = this.datasource?.find((_obj) => _obj[this.valueKey] === event.value);
    // this.formControlSearch.reset();
    this.objectSelected.emit(item);
  }

  onClearSelected() {
    this.formControlSearch.reset();
    this.formControl.reset()
    this.objectSelected.emit(null)
  }
}

