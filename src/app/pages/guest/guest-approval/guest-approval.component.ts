import {Component, inject} from '@angular/core';
import {BaseGuestClass} from "../../../commons/base-guest.class";
import {
  ApprovalAction,
  ApprovalForwardItem,
  ApprovalOwnerStatus,
  ApprovalProcessAction,
  ApprovalStatus,
  ApprovalType,
  DataType,
  EquimentsForMettingRoom,
  LogisticsForMettingRoom,
  TableRowStatus,
  YourActionEnum
} from "../../../commons/types";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {cloneDeep} from "lodash";
import {RoleApproveCreate} from '../../../core/constants/enum';
import {GuestService} from "../guest.service";
import {UploadFileService} from "../../../core/services/upload-file.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {storageKey} from "../../../core/constants/storage-key";
import {LocalStorageService} from '../../../core/services/local-storage.service';
import {endOfDay, getDay, startOfDay} from "date-fns";
import {constant} from "../../../core/constants/constant";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {getColorForChar} from '../../../core/utils/utils';

@Component({
  selector: 'app-guest-approval',
  templateUrl: './guest-approval.component.html',
  styleUrl: './guest-approval.component.scss'
})
export class GuestApprovalComponent extends BaseGuestClass {
  DataTypeEnum = DataType
  ApprovalProcessActionEnum = ApprovalProcessAction
  ApprovalActionEnum = ApprovalAction
  ApprovalType = ApprovalType
  ApprovalStatus = ApprovalStatus
  filterUpdateForm!: FormGroup
  approvalFilter: any = {
    keyword: '',
    page: 1,
    size: 20,
    status: ApprovalOwnerStatus.NextAction,
    formIds: null,
    statuses: null,
    createdFrom: null,
    createdTo: null,
    doneAt: null,
    departmentIds: null,
    creatorIds: null,
    approvalIds: null,
    yourAction: null,
    // type: ApprovalType.Other
  }
  originApprovals: any[] = []
  approvals: any[] = []
  approvalSelected: any = null
  confirmApprovalForm!: FormGroup
  visibleConfirmApprovalDialog = false
  confirmApprovalDialogSetting = {
    header: 'Phê duyệt',
    icon: '',
    submit: '',
    background: 'bg-primary'
  }
  approveDepartments = []
  LineApproveEnum = LineApprove
  ApprovalOwnerStatus = ApprovalOwnerStatus
  tabs = [
    {
      index: 0,
      value: ApprovalOwnerStatus.NextAction,
      name: 'Đến lượt duyệt'
    },
    {
      index: 1,
      value: ApprovalOwnerStatus.Waiting,
      name: 'Chưa đến lượt'
    },
    {
      index: 2,
      value: ApprovalOwnerStatus.Approved,
      name: 'Đã xử lý'
    },
    {
      index: 3,
      value: ApprovalOwnerStatus.Notify,
      name: 'Theo dõi'
    },
    {
      index: 4,
      value: ApprovalOwnerStatus.Forward,
      name: 'Chuyển tiếp'
    },
    {
      index: 5,
      value: ApprovalOwnerStatus.Submitted,
      name: 'Đã gửi'
    },
    {
      index: 6,
      value: ApprovalOwnerStatus.Draft,
      name: 'Bản nháp'
    },
  ]
  selectedTab: any = this.tabs[0];
  selectedFilterObj: any;
  userLogin: any
  approvalTypes: any = []
  equipments = [
    {
      value: EquimentsForMettingRoom.Internet,
      label: 'Mạng',
      selected: false
    },
    {
      value: EquimentsForMettingRoom.Projector,
      label: 'Máy chiếu',
      selected: false
    },
    {
      value: EquimentsForMettingRoom.OnlineMeetingHCM,
      label: 'Họp trực tuyến với HCM',
      selected: false
    },
  ]
  logistics = [
    {
      value: LogisticsForMettingRoom.Candy,
      label: 'Bánh kẹo',
      selected: false
    },
    {
      value: LogisticsForMettingRoom.Flower,
      label: 'Hoa tươi',
      selected: false
    },
    {
      value: LogisticsForMettingRoom.Water,
      label: 'Nước lọc',
      selected: false
    },
  ]
  yourActions = [
    {
      value: YourActionEnum.Approve,
      label: 'Đến lượt phê duyệt',
    },
    {
      value: YourActionEnum.Consent,
      label: 'Đến lượt thẩm định',
    },
    {
      value: YourActionEnum.Waiting,
      label: 'Chưa đến lượt',
    },
  ]
  disabledFilterApprovalType: any
  authorizeForm!: FormGroup
  approvalDialogForm!: FormGroup
  visibleAuthorizeDialog = false
  authorizeDialogSetting = {
    header: 'Ủy quyền phê duyệt',
    btnOK: '',
    btnCancel: ''
  }
  addApproverDialog = false
  addApproverDialogSetting = {
    header: 'Cập nhật luồng phê duyệt',
    btnOK: '',
    btnCancel: '',
    width: '50vw'
  }
  authorizeUsers = []
  employees = [];
  showNote = false;
  noteDialogSetting = {
    header: 'Thêm phản hồi',
    btnOK: '',
    btnCancel: '',
  }
  showCreateFilter = false;
  createFilterDialogSetting = {
    header: 'Thêm bộ lọc',
    btnOK: '',
    btnCancel: '',
  }
  filterName: FormControl = new FormControl();
  noteForm!: FormGroup;
  showCC = false;
  ccDialogSetting = {
    header: 'Thêm người theo dõi',
    btnOK: '',
    btnCancel: '',
  }
  subscriberIdsCtr: FormControl = new FormControl();
  filterDialogSetting = {
    header: 'Bộ lọc',
    btnOK: 'Xác nhận',
    // btnCancel: 'Hủy',
    btnOther: 'Lưu bộ lọc'
  }
  filterEditDialogSetting = {
    header: 'Cập nhật bộ lọc',
    btnOK: 'Lưu bộ lọc',
    btnCancel: 'Hủy',
  }
  showAddApproval = false;
  addApprovalDialogSetting = {
    header: 'Thêm phê duyệt',
    btnOK: '',
    btnCancel: '',
  }
  showForwardApproval = false;
  forwardApprovalDialogSetting = {
    header: 'Chuyển tiếp phê duyệt',
    btnOK: '',
    btnCancel: '',
  }
  showFilter = false;
  showFilterEdit = false;
  startDate: any = null;
  endDate: any = null;
  startDateDoneAt: any = null;
  endDateDoneAt: any = null;
  startDateEdit: any = null;
  endDateEdit: any = null;
  startDateDoneAtEdit: any = null;
  endDateDoneAtEdit: any = null;
  statusEnums = [
    // { key: 'Tất cả', selected: false, value: ['Approved', 'UnderReview', 'Pending', 'Rejected', 'Recalled', 'Draft'] },
    {key: 'Đã phê duyệt', selected: false, value: 'Approved'},
    {key: 'Chờ phê duyệt', selected: false, value: 'UnderReview'},
    {key: 'Chưa đạt', selected: false, value: 'Pending'},
    {key: 'Từ chối', selected: false, value: 'Rejected'},
    {key: 'Hủy bỏ', selected: false, value: 'Recalled'},
    {key: 'Bản nháp', selected: false, value: 'Draft'}
  ]
  statusEnumsEdit = cloneDeep(this.statusEnums);
  searchTerm = "";
  updateApprovalData: any;
  isConfirmDraft = false;
  idDeleteDraft: any;
  confirmDraftSetting = {
    header: 'Cảnh báo',
    message: 'Bạn có muốn xóa bản nháp này không?',
    btnOK: 'Xóa',
    btnCancel: 'Hủy',
    isConfirmDraft: true
  }
  idDeleteFilter: any;
  isConfirmFilter = false;
  confirmFilterSetting = {
    header: 'Cảnh báo',
    message: 'Bạn có muốn xóa bộ lọc này không?',
    btnOK: 'Xóa',
    btnCancel: 'Hủy',
    isConfirmFilter: true
  }
  // @ViewChild(GuestApprovalCreateComponent) addApprovalChild: GuestApprovalCreateComponent;
  isUpdateSubscribers = false;
  subscriberIds = [
    "00a8e822-dd58-4bde-aa9a-7d2cac05b7f7"
  ];
  showUpdateSub = false;
  lineApprovals: any = [];
  listFilter: any = [];
  dataFilterUpdate: any;
  creatorsOrigin = [];
  approvalsOrigin = [];
  size = {
    filter: 15,
    list: 25,
    detail: 60
  }
  isCountFilter = true;
  approverSelectedList: any = []
  approverList: any = []
  RoleApproveCreate = RoleApproveCreate
  progressData: any = []
  progressForm!: FormGroup
  isShowContent = [
    {key: ApprovalForwardItem.Comment, show: true},
    {key: ApprovalForwardItem.Detail, show: true},
    {key: ApprovalForwardItem.History, show: true},
    {key: ApprovalForwardItem.Progress, show: true}
  ]
  ApprovalForwardItem = ApprovalForwardItem

  /** Serrvices */
  // localStorageService = inject(LocalStorageService)

  constructor(
    // private homeService: HomeService,
    private guestService: GuestService,
    // private commonService: CommonService,
    private uploadFileService: UploadFileService,
    // private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    // private adminManagementService: AdminManagementService,
    private domSanitizer: DomSanitizer
  ) {
    super();
  }

  async ngOnInit() {
    this.progressForm = new FormGroup({
      note: new FormControl(null),
      approver: new FormControl(null)
    })
    this.confirmApprovalForm = new FormGroup({
      id: new FormControl(null),
      action: new FormControl(null),
      note: new FormControl(null),
      file: new FormControl(null),
      inputFile: new FormControl([]),
      image: new FormControl(null),
      inputImage: new FormControl([])
    })
    this.filterForm = new FormGroup({
      keyword: new FormControl(null),
      formIds: new FormControl(null),
      createdTo: new FormControl(null),
      statuses: new FormControl(null),
      createdFrom: new FormControl(null),
      type: new FormControl(null),
      departmentIds: new FormControl(null),
      creatorIds: new FormControl(null),
      approvalIds: new FormControl(null),
      yourAction: new FormControl(null)
    })
    this.filterUpdateForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      keyword: new FormControl(null),
      formIds: new FormControl(null),
      createdTo: new FormControl(null),
      statuses: new FormControl(null),
      createdFrom: new FormControl(null),
      type: new FormControl(null),
      departmentIds: new FormControl(null),
      creatorIds: new FormControl(null),
      approvalIds: new FormControl(null),
      yourAction: new FormControl(null)
    })
    this.approvalDialogForm = new FormGroup({})
    this.authorizeForm = new FormGroup({
      userId: new FormControl(null),
      note: new FormControl(null, [Validators.required]),
      currentStepId: new FormControl(null),
      id: new FormControl(null),
      name: new FormControl(null),
      type: new FormControl(null),
      approvalType: new FormControl(LineApprove.Approve_Level),
      approvalId: new FormControl(null),
      approvalDepartmentId: new FormControl(null),
    })
    this.noteForm = new FormGroup({
      note: new FormControl(null, Validators.required),
      id: new FormControl(null),
      image: new FormControl(null),
      file: new FormControl(null),
      inputFile: new FormControl([]),
      inputImage: new FormControl([]),
    });
    this.userLogin = JSON.parse(localStorage.getItem(storageKey?.user) || '')?.user?.officeUser
    this.activatedRoute.queryParams.subscribe(async (param: any) => {
      this.disabledFilterApprovalType = !!param?.type;
      if (param && param.id) {
        await this.onSelectApproval(param.id)
      }
      // this.approvalFilter.type = param?.type || ApprovalType.Other
      // this.filterForm.patchValue({
      //     type: param?.type || ApprovalType.Other
      // })
    })
    this.getOfficeApprovalFormGetList();
    await Promise.all([
      // this.onGetEmployee(),
      this.onGetFilterList(),
      this.onGetApprovalList(),
      this.onGetDepartmentFullList(),
    ])
  }

  // Thực hiện các hành động khác khi khoảng thời gian thay đổi
  clearDateRange() {
    this.startDate = null;
    this.endDate = null;
  }

  clearDateRangeDoneAt() {
    this.startDateDoneAt = null;
    this.endDateDoneAt = null;
  }

  clearDateRangeEdit() {
    this.startDateEdit = null;
    this.endDateEdit = null;
  }

  clearDateRangeDoneAtEdit() {
    this.startDateDoneAtEdit = null;
    this.endDateDoneAtEdit = null;
  }

  async getOfficeApprovalFormGetList() {
    const filter = {
      page: 1,
      size: 1000
    }
    const response = await this.guestService.getOfficeApprovalFormGetList(filter)
    this.approvalTypes = response.approvalForms;
    this.approvalTypes.unshift({
      id: '',
      name: "Phê duyệt Email",
      __typename: "ApprovalForm"
    })

  }

  async onGetApprovalList() {
    this.approvalSelected = null;
    if (this.approvalFilter?.page < 2) {
      this.approvals = []
      this.originApprovals = []
    }
    const response = await this.guestService.officeGetApprovalList(this.approvalFilter)
    if (response) {
      if (response.approvals?.length) {
        this.approvalFilter = {
          ...this.approvalFilter,
          page: this.approvalFilter.page + 1,
        }
      }
      this.originApprovals = [
        ...(this.originApprovals || []),
        ...(response?.approvals || [])
      ]
      const _approvalUpdate = response?.approvals?.map((item) => {
        const _requesterTitle = item.requester?.departments?.reduce((title, _item, index) => {
          title += (index > 0 ? ', ' : '') + (_item?.title?.name || '')
          return title
        }, '') || ''
        const _requesterDept = item.requester?.departments?.reduce((dept, _item, index) => {
          dept += (index > 0 ? ', ' : '') + (_item.department?.name || '')
          return dept
        }, '') || ''
        return {
          ...item,
          ...this.getStatusColor(item.steps, item.status, item),
          requester: {
            ...item.requester,
            requesterTitle: _requesterTitle || '',
            requesterDept: _requesterDept || '',
            requesterAvatar: item.requester?.imageUrls?.[0] || '/assets/images/guest/ic_user_default.svg'
          },
        }
      })

      this.approvals = [
        ...(this.approvals || []),
        ...(_approvalUpdate || [])
      ]

      setTimeout(() => {
        this.searchTerm = this.filterForm.value.keyword;
      }, 100);
    }
  }

  // async onGetEmployee() {
  //   const filter = {
  //     page: 1,
  //     size: 20
  //   }
  //   const response = await this.adminManagementService.getEmployeeOfficeList(filter)
  //   this.employees = response?.officeUsers
  // }

  async onGetFilterList() {
    const response = await this.guestService.officeApprovalFilterList(null)
    this.listFilter = response?.records || [];
  }

  async onSearch() {
    this.isCountFilter = true;
    let mergeCreated;
    let mergeDoneAt;
    if (this.selectedFilterObj) {
      const range1Created = {
        startDate: this.selectedFilterObj.filter?.createdFrom,
        endDate: this.selectedFilterObj.filter?.createdTo
      }
      const range2Created = {
        startDate: this.startDate,
        endDate: this.endDate
      }
      mergeCreated = this.getIntersectionRange(range1Created, range2Created)

      const range1DoneAt = {
        startDate: this.selectedFilterObj.filter?.doneAt?.start,
        endDate: this.selectedFilterObj.filter?.doneAt?.end
      }
      const range2DoneAt = {
        startDate: this.startDateDoneAt,
        endDate: this.endDateDoneAt
      }
      mergeDoneAt = this.getIntersectionRange(range1DoneAt, range2DoneAt)
    }
    this.approvalFilter = {
      ...this.approvalFilter,
      page: 1,
      formIds: this.selectedFilterObj?.filter?.formIds ? this.mergeAndRemoveDuplicates(this.filterForm.value.formIds, this.selectedFilterObj.filter.formIds) : this.filterForm.value.formIds,
      creatorIds: this.selectedFilterObj?.filter?.creatorIds ? this.mergeAndRemoveDuplicates(this.filterForm.value.creatorIds, this.selectedFilterObj.filter.creatorIds) : this.filterForm.value.creatorIds,
      approvalIds: this.selectedFilterObj?.filter?.approvalIds ? this.mergeAndRemoveDuplicates(this.filterForm.value.approvalIds, this.selectedFilterObj.filter.approvalIds) : this.filterForm.value.approvalIds,
      departmentIds: this.selectedFilterObj?.filter?.departmentIds ? this.mergeAndRemoveDuplicates(this.filterForm.value.departmentIds, this.selectedFilterObj.filter.departmentIds) : this.filterForm.value.departmentIds,
      // @ts-ignore
      createdFrom: mergeCreated && mergeCreated.start
        ? startOfDay(new Date(mergeCreated.start)).getTime()
        : (this.startDate ? startOfDay(new Date(this.startDate)).getTime() : null),  // this.startDate ? startOfDay(new Date(this.startDate)).getTime() : null,
      // @ts-ignore
      createdTo: mergeCreated && mergeCreated.end
        ? endOfDay(new Date(mergeCreated.end)).getTime()
        : (this.endDate ? endOfDay(new Date(this.endDate)).getTime() : null), //this.endDate ? endOfDay(new Date(this.endDate)).getTime() : null,
      statuses: this.filterForm.value.statuses,
      keyword: this.filterForm.value.keyword || '',
      // @ts-ignore
      doneAt: {
        start: mergeDoneAt && mergeDoneAt.start
          ? startOfDay(new Date(mergeDoneAt.start)).getTime()
          : (this.startDateDoneAt ? startOfDay(new Date(this.startDateDoneAt)).getTime() : null),
        end: mergeDoneAt && mergeDoneAt.end
          ? startOfDay(new Date(mergeDoneAt.end)).getTime()
          : (this.endDateDoneAt ? endOfDay(new Date(this.endDateDoneAt)).getTime() : null),
      },
      yourAction: this.filterForm.value.yourAction
    }
    await this.onGetApprovalList()
  }

  getIntersectionRange(range1: any, range2: any) {
    const range1Start = range1.startDate ? new Date(range1.startDate) : null;
    const range1End = range1.endDate ? new Date(range1.endDate) : null;
    const range2Start = range2.startDate ? new Date(range2.startDate) : null;
    const range2End = range2.endDate ? new Date(range2.endDate) : null;

    const intersectionStart = range1Start && range2Start ?
      (range1Start > range2Start ? range1Start : range2Start) :
      (range1Start || range2Start);

    const intersectionEnd = range1End && range2End ?
      (range1End < range2End ? range1End : range2End) :
      (range1End || range2End);
    return {start: intersectionStart, end: intersectionEnd}
  }

  async onTabChange(event: any) {
    this.selectedFilterObj = null;
    // this.resetFilter();
    this.approvals = [];
    this.originApprovals = [];
    this.approvalFilter = {
      ...this.filterForm.value,
      page: 1,
      size: 20,
      status: this.tabs[event.source?._value].value
    }
    this.selectedTab = this.tabs[event.source?._value]
    await this.onGetApprovalList()
    this.showUpdateSub = false;
    this.isUpdateSubscribers = false;
    const element: any = document.getElementById('approvalDIV')
    element.scrollTo(0, 0);
  }

  checkStatus(): any {
    let arrStatus: any = []
    if ((this.statusEnums.filter(res => res.selected)?.length == 0 || this.statusEnums[0].selected) && (!this.selectedFilterObj?.filter?.statuses)) {
      arrStatus = this.statusEnums[0].value
    } else {
      this.statusEnums.map((data: any) => {
        if (data.selected) {
          arrStatus.push(data.value)
        }
      })
    }

    const arrS = this.selectedFilterObj ? this.mergeAndRemoveDuplicates(arrStatus, this.selectedFilterObj?.filter?.statuses) : arrStatus;
    return arrS;
  }

  mergeAndRemoveDuplicates(array1: any, array2: any) {
    if (!array1 || !array2) {
      return null
    }
    const intersection = array1?.filter((value: any) => array2?.includes(value));
    return intersection;
    // return [...new Set([...array1 || [], ...array2 || []])];
  }

  checkStatusUpdate(): any {
    let arrStatus: any = []
    if (this.statusEnumsEdit[0].selected) {
      arrStatus = this.statusEnumsEdit[0].value
    } else {
      this.statusEnumsEdit.map((data: any) => {
        if (data.selected) {
          arrStatus.push(data.value)
        }
      })
    }
    return arrStatus;
  }

  async onScrollApproval(event: any) {
    const element = document.getElementById('approvalDIV')
    if (Math.ceil(event.target.scrollHeight) - Math.ceil(event.target.offsetHeight + event.target.scrollTop) < 2) {
      await this.onGetApprovalList()
    }
  }

  async onSelectItemApproval(id: any, status = '') {
    if (status == ApprovalOwnerStatus.Draft) {
      return;
    } else {
      await this.onSelectApproval(id, status = '')
    }
  }

  async onSelectApproval(id: any, status = '') {
    this.showUpdateSub = false;
    this.isUpdateSubscribers = false;
    const item: any = await this.guestService.officeGetApprovalDetail(id)
    this.subscriberIdsCtr.setValue(item?.subscriberIds)
    const steps = this.updateSteps(item?.steps)

    const bookingRoomRemindName = item.roomBookingRequest?.repeatedDays?.reduce((_result: any, day: any) => {
      _result += (constant.dayOfWeeks.find((_d) => Number(_d.numberValue) === day)?.fullName || '') + ', '
      return _result
    }, '') || ''
    const hostTitle = item.roomBookingRequest?.host?.departments?.reduce((_result: any, dept: any, index: any) => {
      _result += (index > 0 ? ', ' : '') + (dept?.title?.name || '')
      return _result
    }, '') || ''
    const _logistics = item.roomBookingRequest?.logistics?.reduce((_result: any, item: any) => {
      _result += (this.logistics.find((it) => it.value === item)?.label || '') + ', '
      return _result
    }, '') || ''
    const _equiments = item.roomBookingRequest?.equiments?.reduce((_result: any, item: any) => {
      _result += (this.equipments.find((it) => it.value === item)?.label || '') + ', '
      return _result
    }, '') || ''
    const bookingRoomDayOfStartAt = item.roomBookingRequest?.startAt
      ? (constant.dayOfWeeks.find((_d) => Number(_d.numberValue) === getDay(new Date(item.roomBookingRequest?.startAt)))?.fullName + ', ')
      : ''
    const bookingRoomDayOfEndAt = item.roomBookingRequest?.endAt
      ? (constant.dayOfWeeks.find((_d) => Number(_d.numberValue) === getDay(new Date(item.roomBookingRequest?.endAt)))?.fullName + ', ')
      : ''
    const bookingCarDayOfStartAt = item.carBookingRequest?.startAt
      ? (constant.dayOfWeeks.find((_d) => Number(_d.numberValue) === getDay(new Date(item.carBookingRequest?.startAt)))?.fullName + ', ')
      : ''
    const bookingCarDayOfEndAt = item.carBookingRequest?.endAt
      ? (constant.dayOfWeeks.find((_d) => Number(_d.numberValue) === getDay(new Date(item.carBookingRequest?.endAt)))?.fullName + ', ')
      : ''
    const requesterDepartments = item.requester?.departments?.map((_dept: any) => _dept.department?.name || '')
    const fields = item.fields?.reduce((arr: any, _field: any): any => {
      const _tableRows = _field.tableRows?.map((row: any): any => {
        return {
          checked: row?.status == "Approved",
          disabled: Boolean(![TableRowStatus.Approved, TableRowStatus.Pending].includes(row.status)),
          ...row
        }
      })
      arr.push({
        ..._field,
        tableRows: _tableRows
      })
      return arr
    }, []) || []

    const data = {
      ...item,
      fields,
      attachmentFiles: this.getFileName(item.attachmentUrls),
      attachmentImages: this.getFileName(item.imageUrls),
      ...this.getStatusColor(item.steps, item.status, item),
      requester: {
        ...item.requester,
        requesterAvatar: item.requester?.imageUrls?.[0] || '/assets/images/guest/ic_user_default.svg',
        requesterDepartmentName: requesterDepartments?.join(', ')
      },
      bookingRoomRemindName,
      hostTitle,
      logisticsName: _logistics.substring(0, _logistics.length - 2),
      equimentsName: _equiments.substring(0, _equiments.length - 2),
      bookingRoomDayOfStartAt,
      bookingRoomDayOfEndAt,
      bookingCarDayOfStartAt,
      bookingCarDayOfEndAt,
      steps
    }

    if (status == ApprovalOwnerStatus.Draft) {
      this.showAddApproval = true;
      this.updateApprovalData = data;
      this.addApprovalDialogSetting.header = 'Cập nhật bản nháp';
      return;
    } else {
      this.updateApprovalData = null;
    }

    this.approvalSelected = data;

    if (this.approvalSelected?.status == ApprovalStatus.Forward) {
      if (this.approvalSelected?.forward?.createdBy == this.userLogin.id) {
        this.changeShowContent(this.approvalSelected?.forward?.users[0].showItems)
      } else {
        this.changeShowContent(this.approvalSelected?.forward?.users.find((x: any) => x.user?.id == this.userLogin.id)?.showItems)
      }
    } else {
      this.isShowContent = [
        {key: ApprovalForwardItem.Comment, show: true},
        {key: ApprovalForwardItem.Detail, show: true},
        {key: ApprovalForwardItem.History, show: true},
        {key: ApprovalForwardItem.Progress, show: true}
      ]
    }
    const currentStep = item.steps?.find((s: any) => s.currentStep)
    this.authorizeForm.patchValue({
      currentStepId: currentStep?.id
    })
    // this.homeService.setHeaderTitle({
    //   headerTitle: '',
    //   mobileOption: {
    //     hasBackButton: true,
    //     showHeader: true,
    //     onBack: () => {
    //       this.approvalSelected = null
    //       this.homeService.setHeaderTitle({
    //         headerTitle: 'Phê duyệt',
    //         mobileOption: {
    //           hasBackButton: false,
    //           onBack: () => {
    //           },
    //           showHeader: true
    //         }
    //       })
    //     }
    //   }
    // })
  }

  onConfirmApproval(action: any, item: any): void {
    this.approvalSelected = item
    this.confirmApprovalForm.reset()
    this.confirmApprovalForm.patchValue({
      id: item.id,
      action: item.yourAction === ApprovalAction.Consent ? ApprovalProcessAction.Consent : action
    })
    switch (action) {
      case ApprovalProcessAction.Approve:
        this.confirmApprovalDialogSetting.header = item?.yourAction === ApprovalAction.Approve ? 'Phê duyệt' : 'Thẩm định'
        this.confirmApprovalDialogSetting.icon = '/assets/images/ic_pd_btn.svg'
        this.confirmApprovalDialogSetting.submit = item?.yourAction === ApprovalAction.Approve ? 'Phê duyệt' : 'Thẩm định'
        this.confirmApprovalDialogSetting.background = '#00D18A'
        // this.confirmApprovalDialogSetting.btnOK = item?.yourAction === ApprovalAction.Approve ? 'Phê duyệt' : 'Xác nhận'
        // this.confirmApprovalDialogSetting.btnDelete = ''
        break
      case ApprovalProcessAction.Reject:
        this.confirmApprovalDialogSetting.header = 'Từ chối'
        this.confirmApprovalDialogSetting.icon = '/assets/images/ic_tc_btn.svg'
        this.confirmApprovalDialogSetting.submit = 'Từ chối'
        this.confirmApprovalDialogSetting.background = '#EB5454'
        break
      case ApprovalProcessAction.Comment:
        this.confirmApprovalDialogSetting.header = 'Ghi chú'
        // this.confirmApprovalDialogSetting.btnOK = 'Lưu'
        // this.confirmApprovalDialogSetting.btnDelete = ''
        break
      case ApprovalProcessAction.Cancel:
        this.confirmApprovalDialogSetting.header = 'Hủy yêu cầu'
        this.confirmApprovalDialogSetting.background = '#EB5454'
        this.confirmApprovalDialogSetting.submit = 'Hủy yêu cầu'
        // this.confirmApprovalDialogSetting.btnOK = ''
        // this.confirmApprovalDialogSetting.btnCancel = 'Đóng'
        // this.confirmApprovalDialogSetting.btnDelete = 'Hủy'
        break
      case 'Pending':
        this.confirmApprovalDialogSetting.header = 'Chưa đạt'
        this.confirmApprovalDialogSetting.background = '#FFB038'
        this.confirmApprovalDialogSetting.submit = 'Chưa đạt'
        this.confirmApprovalDialogSetting.icon = '/assets/images/ic_tc_btn.svg'
        // this.confirmApprovalDialogSetting.btnOK = ''
        // this.confirmApprovalDialogSetting.btnCancel = 'Đóng'
        // this.confirmApprovalDialogSetting.btnDelete = 'Hủy'
        break
    }
    this.visibleConfirmApprovalDialog = true
  }

  async onFileChange(event: any, isImage = false) {
    if (isImage) {
      const _files: any = Array.from(event.target.files).reduce((arr: any, file: any) => {
        const size = file.size / (1024 * 1024);
        if (size >= 20) {
          this.commonService.openSnackBarError(`Dung lượng tệp ${file.name} vượt quá giới hạn cho phép (20 MB). Vui lòng chọn tệp nhỏ hơn.`);
        }
        if (file.type?.includes('image/') && size < 20)
          arr.push(file)
        return arr
      }, []) || []
      this.confirmApprovalForm.patchValue({
        image: [...this.confirmApprovalForm.value.image || [], ..._files],
      })
    } else {
      const _files: any = Array.from(event.target.files).reduce((arr: any, file: any) => {
        const size = file.size / (1024 * 1024);
        if (size >= 20) {
          this.commonService.openSnackBarError(`Dung lượng tệp ${file.name} vượt quá giới hạn cho phép (20 MB). Vui lòng chọn tệp nhỏ hơn.`);
        }
        if (size < 20)
          arr.push(file)
        return arr
      }, []) || []
      this.confirmApprovalForm.patchValue({
        file: [...this.confirmApprovalForm.value.file || [], ..._files],
      })
    }
    // this.confirmApprovalForm.controls.inputFile.reset()
    // this.confirmApprovalForm.controls.inputImage.reset()
  }

  onRemoveNoteFile(index: any, isImage = false) {
    if (isImage) {
      const images = this.noteForm.value.image
      images.splice(index, 1)
      this.noteForm.patchValue({
        image: images
      })
    } else {
      const files = this.noteForm.value.file
      files.splice(index, 1)
      this.noteForm.patchValue({
        file: files
      })
    }
  }

  onRemoveFile(index: any, isImage = false) {
    if (isImage) {
      const images = this.confirmApprovalForm.value.image
      images.splice(index, 1)
      this.confirmApprovalForm.patchValue({
        image: images
      })
    } else {
      const files = this.confirmApprovalForm.value.file
      files.splice(index, 1)
      this.confirmApprovalForm.patchValue({
        file: files
      })
    }
  }

  onCloseConfirmApprovalDialog(event: any) {
    this.visibleConfirmApprovalDialog = false
  }

  async onCloseFilterDialog(event: any) {
    if (event == 'btnClose') {
      this.isCountFilter = false;
    }
    this.showFilter = false;
  }

  async onCloseFilterEditDialog(event: any) {
    this.showFilterEdit = false;
    this.filterUpdateForm.reset();
    this.statusEnumsEdit.forEach(obj => {
      obj['selected'] = false;
    });
    this.startDateEdit = null;
    this.endDateEdit = null;
    this.startDateDoneAtEdit = null;
    this.endDateDoneAtEdit = null;
  }

  async onSubmitFilterDialog() {
    this.showFilter = false;
    await this.onSearch()
  }

  async onSubmitFilterEditDialog() {
    this.filterUpdateForm.markAllAsTouched()
    if (this.filterUpdateForm.invalid) {
      this.commonService.openSnackBarError('Trường bắt buộc không được trống')
      return
    }
    let args: any = {
      name: this.filterUpdateForm.value.name,
      filter: this.filterUpdateForm.value
    }
    args.approvalFilterId = this.dataFilterUpdate.id
    args.filter.createdFrom = this.startDateEdit ? startOfDay(new Date(this.startDateEdit)).getTime() : null,
      args.filter.createdTo = this.endDateEdit ? endOfDay(new Date(this.endDateEdit)).getTime() : null,
      // args.filter.statuses = this.checkStatusUpdate(),
      args.filter.doneAt = this.startDateDoneAtEdit || this.endDateDoneAtEdit ? {
        start: this.startDateDoneAtEdit ? startOfDay(new Date(this.startDateDoneAtEdit)).getTime() : null,
        end: this.endDateDoneAtEdit ? endOfDay(new Date(this.endDateDoneAtEdit)).getTime() : null,
      } : null
    delete args.filter.name;
    const response = await this.guestService.officeApprovalFilterUpdate(args)
    if (response) {
      this.commonService.openSnackBar(`Cập nhật bộ lọc thành công`);
      this.showFilterEdit = false;
      this.statusEnumsEdit.forEach(obj => {
        obj['selected'] = false;
      });
      await this.onGetFilterList();
      this.selectedFilter(response)
    }
    // this.showFilter = false;
    // this.onSearch()
  }

  async onSubmitConfirmApprovalDialog() {
    this.confirmApprovalForm.markAllAsTouched()
    if (this.confirmApprovalForm.invalid) {
      this.commonService.openSnackBarError('Trường bắt buộc không được trống')
      return
    }
    await this.onSaveApproval()
  }

  async onRejectApprovalDialog() {
    this.confirmApprovalForm.markAllAsTouched()
    if (this.confirmApprovalForm.invalid) {
      this.commonService.openSnackBarError('Trường bắt buộc không được trống')
      return
    }
    await this.onSaveApproval()
  }

  async onSaveApproval() {
    let attachmentIds = []
    let imageIds = []
    if (this.confirmApprovalForm.value.file) {
      const responseUploadFiles = await Promise.all(
        this.confirmApprovalForm.value.file.map((file: any) => {
          return this.uploadFileService.uploadFile(file)
        }))
      if (responseUploadFiles)
        attachmentIds = responseUploadFiles.map((item: any) => item?.id)
    }
    if (this.confirmApprovalForm.value.image) {
      const responseUploadImage = await Promise.all(
        this.confirmApprovalForm.value.image.map((file: any) => {
          return this.uploadFileService.uploadFile(file)
        }))
      if (responseUploadImage)
        imageIds = responseUploadImage.map((item: any) => item?.id)
    }
    let args: any = {
      id: this.confirmApprovalForm.value.id,
      action: this.confirmApprovalForm.value.action,
      comment: this.confirmApprovalForm.value.note,
      attachmentIds,
      imageIds
    }
    if (!attachmentIds.length)
      delete args.attachmentIds
    if (!imageIds.length)
      delete args.imageIds
    if (this.approvalSelected.type === ApprovalType.OfficeShopping) {
      const approvalRowIds = this.approvalSelected.fields?.reduce((arr: any, field: any) => {
        if (field.dataType === DataType.Table) {
          field.tableRows?.map((row: any) => {
            if (row.checked)
              arr.push(row.id)
          })
        }
        return arr
      }, []) || []
      if (approvalRowIds?.length)
        args = {
          ...args,
          approvalRowIds
        }
    }
    const response = await this.guestService.officeUpdateApprovalAction(args)
    if (response) {
      // const _originApprovalIndex = this.originApprovals?.findIndex((item) => item.id === this.approvalSelected.id)
      // const _stepIndex = this.originApprovals[_originApprovalIndex].steps?.findIndex((step) => step.id === response.id)
      // let steps
      // if (_stepIndex > -1) {
      //     this.originApprovals[_originApprovalIndex].steps[_stepIndex] = response
      //     steps = this.updateSteps(this.originApprovals[_originApprovalIndex].steps)
      // } else {
      //     steps = this.updateSteps([
      //         ...this.originApprovals[_originApprovalIndex].steps,
      //         response
      //     ])
      //     this.originApprovals[_originApprovalIndex].steps = [
      //         ...this.originApprovals[_originApprovalIndex].steps,
      //         response
      //     ]
      // }

      const _stepIndex = this.approvalSelected.steps?.findIndex((step: any) => step.id === response.id)
      let steps
      if (_stepIndex > -1) {
        this.approvalSelected.steps[_stepIndex] = response
        steps = this.updateSteps(this.approvalSelected.steps)
      } else {
        steps = this.updateSteps([
          ...this.approvalSelected.steps,
          response
        ])
        this.approvalSelected.steps = [
          ...this.approvalSelected.steps,
          response
        ]
      }
      this.approvalSelected.steps = steps
      this.approvalSelected.yourAction = response?.currentStep
        ? this.approvalSelected.yourAction
        : null
      const approvalIndex = this.approvals?.findIndex((item) => item.id === this.approvalSelected?.id)
      switch (this.approvalFilter.status) {
        case ApprovalOwnerStatus.Waiting:
          this.approvals.splice(approvalIndex, 1)
          this.onSelectApproval(this.approvalSelected.id)
          break
        default:
          this.updateData(response, approvalIndex)
          break
      }
      this.onSearch()
      this.visibleConfirmApprovalDialog = false
    }
  }

  onRemoveFileAttach(index: any) {
    this.approvalSelected.attachmentUrls
  }

  updateData(response: any, approvalIndex: any) {
    let resultStatus = null
    switch (response.action) {
      case ApprovalProcessAction.Approve:
        resultStatus = ApprovalStatus.Approved
        break
      case ApprovalProcessAction.Cancel:
        resultStatus = ApprovalStatus.Recalled
        break;
      case ApprovalProcessAction.Reject:
        resultStatus = ApprovalStatus.Rejected
        break;
      case ApprovalProcessAction.Pending:
        resultStatus = ApprovalStatus.Pending
        break;
      default:
        resultStatus = this.approvalSelected.status
    }
    const _updateItem = {
      ...this.approvalSelected,
      status: resultStatus,
      ...this.getStatusColor(this.approvalSelected.steps, resultStatus, this.approvalSelected)
    }
    this.approvals[approvalIndex] = _updateItem
    this.approvalSelected = _updateItem
  }

  onAuthorize() {
    this.authorizeForm.controls['userId'].reset()
    this.authorizeForm.controls['note'].reset()
    this.authorizeForm.controls['approvalType'].reset()
    this.authorizeForm.controls['approvalId'].reset()
    this.authorizeForm.controls['approvalDepartmentId'].reset()
    this.visibleAuthorizeDialog = true
  }

  async onSubmitAuthorizeDialog() {
    this.authorizeForm.markAllAsTouched()
    if (this.authorizeForm.invalid) {
      this.commonService.openSnackBarError('Trường bắt buộc không được trống')
      return
    }
    // const userLogin = this.localStorageService.getObject(storageKey.user)
    if (this.userLogin && this.userLogin?.id === this.authorizeForm.value.userId) {
      this.commonService.openSnackBarError('Người phê duyệt phải khác tài khoản đang sử dụng')
      return
    }
    const idStep = this.approvalSelected?.steps?.find((x: any) => x.approveBy?.includes(this.userLogin?.id))?.id;
    let args = {}
    switch (this.authorizeForm.value.approvalType) {
      case LineApprove.Approve:
        args = {
          action: ApprovalProcessAction.Grant,
          comment: this.authorizeForm.value.note,
          grantStepId: idStep, //this.authorizeForm.value.currentStepId,
          grantTo: this.authorizeForm.value.approvalId,
          id: this.approvalSelected.id,
          grantToType: this.authorizeForm.value.approvalType
        }
        break
      case LineApprove.Approve_Department:
        args = {
          action: ApprovalProcessAction.Grant,
          comment: this.authorizeForm.value.note,
          grantStepId: idStep, //this.authorizeForm.value.currentStepId,
          grantTo: this.authorizeForm.value.approvalDepartmentId,
          id: this.approvalSelected.id,
          grantToType: this.authorizeForm.value.approvalType
        }
        break
    }
    const response = await this.guestService.officeUpdateApprovalAction(args)
    if (response) {
      this.commonService.openSnackBar('Ủy quyền phê duyệt thành công')
      // await this.onSelectApproval(this.approvalSelected)
      const approvalIndex = this.approvals?.findIndex((item) => item.id === this.approvalSelected?.id)
      this.approvals.splice(approvalIndex, 1)
      this.approvalSelected = null
      this.visibleAuthorizeDialog = false
    } else
      this.commonService.openSnackBarError('Ủy quyền phê duyệt thất bại')
  }

  async onCloseAuthorizeDialog(event: any) {
    this.visibleAuthorizeDialog = false
  }

  async onCloseAddApproverDialog(event: any) {
    this.addApproverDialog = false
  }

  /** Common */
  getStatusColor(steps: any, status: any, item: any) {

    if (this.selectedTab?.index == 0 || item.yourAction === this.ApprovalActionEnum.Approve || item.yourAction === this.ApprovalActionEnum.Consent) {
      return {
        statusColor: '#f3fcfe',
        statusText: 'Đến lượt duyệt',
        statusTextColor: '#0dcaf0',
      }
    }

    if (this.approvalFilter.status === ApprovalOwnerStatus.Submitted
      || this.approvalFilter.status === ApprovalOwnerStatus.Waiting
      || this.approvalFilter.status === ApprovalOwnerStatus.Approved
      || this.approvalFilter.status === ApprovalOwnerStatus.Notify
      || this.approvalFilter.status === ApprovalOwnerStatus.Draft
      || this.approvalFilter.status === ApprovalOwnerStatus.NextAction
      || this.approvalFilter.status === ApprovalOwnerStatus.Forward
      || this.selectedFilterObj
    ) {
      switch (status) {
        case ApprovalStatus.Approved:
          return {
            statusColor: '#F6FFF9',
            statusText: 'Đã phê duyệt',
            statusTextColor: '#00D18A',
          }
        case ApprovalStatus.UnderReview:
          return {
            statusColor: '#FFF8EC',
            statusText: 'Chờ phê duyệt',
            statusTextColor: '#FFB038',
          }
        case ApprovalStatus.Rejected:
          return {
            statusColor: '#FFF5F3',
            statusText: 'Từ chối',
            statusTextColor: '#EB5454',
          }
        case ApprovalStatus.Recalled:
          return {
            statusColor: '#FFF5F3',
            statusText: 'Đã hủy bỏ',
            statusTextColor: '#EB5454',
          }
        case ApprovalStatus.Pending:
          return {
            statusColor: '#FFB038',
            statusText: 'Chưa đạt',
            statusTextColor: '#ffffff',
          }
        case ApprovalStatus.Draft:
          return {
            statusColor: '#EFF0F1',
            statusText: 'Bản nháp',
            statusTextColor: '#888888',
          }
        case ApprovalStatus.Forward:
          return {
            statusColor: '#F3ECF8',
            statusText: 'Chuyển tiếp',
            statusTextColor: '#863AB9',
          }
        default:
          return {}
      }
    } else {
      if (item?.status == ApprovalOwnerStatus.Draft) {
        return {
          statusColor: '#EFF0F1',
          statusText: 'Bản nháp',
          statusTextColor: '#888888',
        }
      }
      for (let i = 0; i < steps?.length; i++) {
        if (!steps[i].action
          && steps[i].approvalAction === ApprovalAction.Approve
          && (steps[i].approver?.id === this.userLogin.id || steps[0].actionUser?.id === this.userLogin.id))
          return {
            statusColor: '#FFF8EC',
            statusText: 'Chờ phê duyệt',
            statusTextColor: '#FFB038',
          }

        if (!steps[i].action
          && steps[i].approvalAction === ApprovalAction.Consent
          && steps[i].consentUsers?.some((user: any) => user.id === this.userLogin.id))
          return {
            statusColor: '#FFF8EC',
            statusText: 'Chờ xác nhận',
            statusTextColor: '#FFB038',
          }

        if ([ApprovalProcessAction.Approve].includes(steps[i].action)
          && [ApprovalAction.Approve].includes(steps[i].approvalAction)
          && steps[i].actionUser?.id === this.userLogin.id)
          return {
            statusColor: '#F6FFF9',
            statusText: 'Đã phê duyệt',
            statusTextColor: '#00D18A',
          }

        if ([ApprovalProcessAction.Reject].includes(steps[i].action)
          && [ApprovalAction.Approve].includes(steps[i].approvalAction)
          && steps[i].actionUser?.id === this.userLogin.id)
          return {
            statusColor: '#FFF5F3',
            statusText: 'Từ chối',
            statusTextColor: '#EB5454',
          }

        if ([ApprovalProcessAction.Consent].includes(steps[i].action)
          && [ApprovalAction.Consent].includes(steps[i].approvalAction)
          && steps[i].actionUser?.id === this.userLogin.id)
          return {
            statusColor: '#F6FFF9',
            statusText: 'Đã xác nhận',
            statusTextColor: '#00D18A',
          }
      }
    }
    return null
  }

  getStatusStep(step: any) {
    switch (step.approvalAction) {
      case ApprovalProcessAction.Pending:
        return {
          icon: '/assets/images/ic_pending.svg',
          actionText: 'Chưa đạt',
          textColor: 'text-pending'
        }
      case ApprovalProcessAction.Approve:
        if (step.action == ApprovalProcessAction.Reject) {
          return {
            icon: '/assets/images/guest/ic_reject.svg',
            actionText: 'Từ chối',
            textColor: 'text-red-500'
          }
        } else if (step.action == ApprovalProcessAction.Approve) {
          return {
            icon: '/assets/images/guest/ic_check.svg',
            actionText: 'Đã phê duyệt',
            textColor: 'text-green-600'
          }
        } else {
          return {
            icon: '/assets/images/guest/ic_pending.svg',
            actionText: 'Chờ phê duyệt',
            textColor: 'text-orange-300'
          }
        }
      case ApprovalProcessAction.Cancel:
        return {
          icon: '/assets/images/guest/ic_reject.svg',
          actionText: 'Đã hủy bỏ',
          textColor: 'text-red-500'
        }
      case ApprovalProcessAction.Reject:
        return {
          icon: '/assets/images/guest/ic_reject.svg',
          actionText: 'Từ chối',
          textColor: 'text-red-500'
        }
      case ApprovalProcessAction.Submit:
        return {
          icon: '/assets/images/guest/ic_check.svg',
          actionText: 'Đã gửi yêu cầu',
          textColor: 'text-green-600'
        }
      case ApprovalProcessAction.Consent:
        if (step.action == ApprovalProcessAction.Consent) {
          return {
            icon: '/assets/images/guest/ic_check.svg',
            actionText: 'Đã thẩm định',
            textColor: 'text-green-600'
          }
        } else {
          return {
            icon: '/assets/images/guest/ic_pending.svg',
            actionText: 'Chưa thẩm định',
            textColor: 'text-orange-300'
          }
        }
      case ApprovalProcessAction.Grant:
        return {
          icon: '/assets/images/guest/ic_check.svg',
          actionText: 'Đã ủy quyền',
          textColor: 'text-green-600'
        }
      default:
        if (step.action == ApprovalProcessAction.Submit) {
          return {
            icon: '/assets/images/guest/ic_check.svg',
            actionText: 'Đã gửi yêu cầu',
            textColor: 'text-green-600'
          }
        } else if (step.action == ApprovalProcessAction.Cancel) {
          return {
            icon: '/assets/images/guest/ic_reject.svg',
            actionText: 'Đã hủy bỏ',
            textColor: 'text-red-500'
          }
        } else if (step.action == ApprovalProcessAction.Grant) {
          return {
            icon: '/assets/images/guest/ic_check.svg',
            actionText: 'Đã ủy quyền',
            textColor: 'text-green-600'
          }
        } else if (step.action == ApprovalProcessAction.Pending) {
          return {
            icon: '/assets/images/ic_pending.svg',
            actionText: 'Chưa đạt',
            textColor: 'text-pending'
          }
        } else {
          return {
            icon: '/assets/images/guest/ic_pending.svg',
            actionText: 'Đang xem xét',
            textColor: 'text-blue-300'
          }
        }
    }
  }

  updateSteps(steps: any) {
    const result = steps?.map((currStep: any) => {
      let users = []
      if ([ApprovalProcessAction.Submit, ApprovalProcessAction.Grant, ApprovalProcessAction.Pending].includes(currStep.action)) {
        let _comments: any = []
        let _attachmentUrls: any = []
        let _imageUrls: any = []
        steps.map((it: any) => {
          if ((it.action === ApprovalProcessAction.Comment || [ApprovalProcessAction.Submit, ApprovalProcessAction.Grant, ApprovalProcessAction.Pending].includes(it.action)) && it.actionUser.id === currStep.actionUser.id && it.comment) {
            _comments.push(it.comment)
            _attachmentUrls.push(...(it.attachmentUrls || []))
            _imageUrls.push(...(it.imageUrls || []))
          }
        })
        users.push({
          ...currStep.actionUser,
          userAvatar: currStep.actionUser?.imageUrls?.[0] || '/assets/images/guest/ic_user_default.svg',
          comments: _comments,
          attachmentUrls: this.getFileName(_attachmentUrls),
          imageUrls: this.getFileName(_imageUrls),
        })
      } else if (ApprovalProcessAction.Cancel === currStep.action) {
        let _comments: any = []
        let _attachmentUrls: any = []
        let _imageUrls: any = []
        steps.map((it: any) => {
          if (it.action === ApprovalProcessAction.Cancel && it.actionUser.id === currStep.actionUser.id) {
            _comments.push(it.comment)
            _attachmentUrls.push(...(it.attachmentUrls || []))
            _imageUrls.push(...(it.imageUrls || []))
          }
        })
        users.push({
          ...currStep.actionUser,
          userAvatar: currStep.actionUser?.imageUrls?.[0] || '/assets/images/guest/ic_user_default.svg',
          comments: _comments,
          attachmentUrls: this.getFileName(_attachmentUrls),
          imageUrls: this.getFileName(_imageUrls),
        })
      } else {
        switch (currStep.approvalAction) {
          case ApprovalAction.Approve:
          case null:
            const _approveSteps = currStep?.approvers?.reduce((arr: any, _it: any) => {
              let _comments = steps?.filter((it: any) =>
                it.action === ApprovalProcessAction.Comment && it.actionUser?.id === _it.id
              ).map((cmt: any) => cmt.comment) || []
              if (_it.id === currStep.actionUser?.id)
                _comments = [
                  currStep?.comment || '',
                  ..._comments
                ]
              const isActionUser = currStep?.actionUser?.id === _it.id
              arr.push({
                ..._it,
                userAvatar: _it?.imageUrls?.[0] || '/assets/images/guest/ic_user_default.svg',
                comments: _comments,
                attachmentUrls: isActionUser ? this.getFileName(currStep.attachmentUrls) : [],
                imageUrls: isActionUser ? this.getFileName(currStep.imageUrls) : [],
                role: RoleApproveCreate.Approve
              })
              return arr
            }, []) || []
            users.push(..._approveSteps)
            break
          case ApprovalAction.Consent:
            users = currStep.consentUsers?.reduce((arr: any, consent: any) => {
              const isActionUser = currStep?.actionUser?.id === consent.id
              arr.push({
                ...consent,
                role: RoleApproveCreate.Consent,
                userAvatar: consent?.imageUrls?.[0] || '/assets/images/guest/ic_user_default.svg',
                attachmentUrls: isActionUser ? this.getFileName(currStep.attachmentUrls) : [],
                imageUrls: isActionUser ? this.getFileName(currStep.imageUrls) : [],
                comments: steps?.filter((it: any) =>
                  it.action === ApprovalProcessAction.Consent && it.actionUser?.id === currStep.actionUser?.id)
                  .map((cmt: any) => cmt.comment) || []
              })
              return arr
            }, []) || []
            break
        }

      }
      return {
        ...currStep,
        ...this.getStatusStep(currStep),
        users
      }
    })
    return result
  }

  getFileName(files: any, character = '_', position = 2) {
    const results = files?.reduce((result: any, item: any) => {
      const splits = item.split(character)
      const _result = splits.slice(position)
      result.push({
        url: item,
        name: decodeURI(_result.join(character))
      })
      return result
    }, []) || []
    return results
  }

  onTabChangeRadio(event: any) {
    ['approvalId', 'approvalDepartmentId'].map((ctr) => {
      this.authorizeForm.get(ctr)?.clearValidators()
    })
    switch (event.value) {
      case LineApprove.Approve:
        this.authorizeForm.controls['approvalId']?.setValidators(Validators.required)
        break
      case LineApprove.Approve_Department:
        this.authorizeForm.controls['approvalDepartmentId']?.setValidators(Validators.required)
        break
    }
    ['approvalId', 'approvalDepartmentId'].map((ctr) => {
      this.authorizeForm.get(ctr)?.reset()
      this.authorizeForm.get(ctr)?.updateValueAndValidity()
    })
    this.authorizeForm.updateValueAndValidity()
  }

  async onGetDepartmentFullList() {
    const filter = {
      page: 1,
      size: 20,
    }
    const response = await this.guestService.getOrganizationauthorityFullList(filter)
    this.approveDepartments = response?.orgCharts?.filter((_org: any) => _org.approver?.id)
  }

  getShortName(fullName: string): string {
    let shotName = ''
    if (fullName) {
      const names = fullName?.trim()?.split(' ')?.reduce((arr: any, curr) => {
        arr.push(curr?.trim())
        return arr
      }, []) || []
      shotName = names?.length === 1
        ? names?.[0]?.substr(0, 1)
        : names?.[0]?.substr(0, 1) + names?.[names.length - 1]?.substr(0, 1)
    }
    return shotName.toUpperCase()
  }

  addNote() {
    this.showNote = true
    this.noteForm.reset()
  }

  onCloseNote(event: any) {
    this.showNote = false
  }

  onCloseAddApproval(e: any) {
    // this.onGetApprovalList()
    // this.addApprovalChild.approvalSelected = null;
    this.showAddApproval = false;
    this.updateApprovalData = null;
    // this.addApprovalChild.openConfirmDraft()
  }

  async onSubmitNote() {
    this.noteForm.markAllAsTouched()
    if (this.noteForm.invalid) {
      this.commonService.openSnackBarError('Trường bắt buộc không được trống')
      return
    }
    let attachmentIds = []
    let imageIds = []
    if (this.noteForm.value.file) {
      const responseUploadFiles = await Promise.all(
        this.noteForm.value.file.map((file: any) => {
          return this.uploadFileService.uploadFile(file)
        }))
      if (responseUploadFiles)
        attachmentIds = responseUploadFiles.map((item: any) => item?.id)
    }
    if (this.noteForm.value.image) {
      const responseUploadImage = await Promise.all(
        this.noteForm.value.image.map((file: any) => {
          return this.uploadFileService.uploadFile(file)
        }))
      if (responseUploadImage)
        imageIds = responseUploadImage.map((item: any) => item?.id)
    }
    const formValue = this.noteForm.value;
    const args = {
      comment: formValue.note,
      approvalId: this.approvalSelected.id,
      attachmentIds,
      imageIds
    };
    const response = await this.guestService.createCommentApprove(args)
    if (response) {
      this.commonService.openSnackBar(`Thêm mới thành công`);
      this.showNote = false
      this.approvalSelected.comments = response?.comments
    } else {
      this.commonService.openSnackBarError(`Thêm mới thất bại`);
    }
  }

  onShowFilter() {
    this.isCountFilter = true;
    this.showFilter = !this.showFilter;

  }

  checkStatusFilter(name: any): void {
    if (name == 'Tất cả') {
      if (this.statusEnums[0].selected) {
        this.statusEnums = this.statusEnums.map(data => {
          return {
            ...data,
            selected: true
          }
        })
      }
      if (!this.statusEnums[0].selected) {
        this.statusEnums = this.statusEnums.map((res) => {
          return {
            ...res,
            selected: false
          }
        })
      }
    } else {
      if (this.statusEnums.slice(1).filter(data => data.selected).length == 6 && !this.statusEnums[0].selected) {
        this.statusEnums[0].selected = true
      } else if (this.statusEnums.slice(1).filter(data => data.selected).length != 6) {
        this.statusEnums[0].selected = false
      }
    }
  }

  getCheckFilter(): number {
    if (!this.isCountFilter) {
      return 0;
    }
    return this.statusEnums.filter(data => data.selected)?.length + (this.startDate ? 1 : 0) + (this.endDate ? 1 : 0) + (this.startDateDoneAt ? 1 : 0) + (this.endDateDoneAt ? 1 : 0)
      + (this.filterForm.value.formIds?.length ? this.filterForm.value.formIds?.length : 0)
      + (this.filterForm.value.approvalIds?.length ? this.filterForm.value.approvalIds?.length : 0)
      + (this.filterForm.value.creatorIds?.length ? this.filterForm.value.creatorIds?.length : 0)
      + (this.filterForm.value.departmentIds?.length ? this.filterForm.value.departmentIds?.length : 0)
      + (this.filterForm.value.yourAction?.length ? this.filterForm.value.yourAction?.length : 0)
      ;
  }

  async onFileChangeComment(event: any, isImage = false) {
    if (isImage) {
      const _files: any = Array.from(event.target.files).reduce((arr: any, file: any) => {
        const size = file.size / (1024 * 1024);
        if (size >= 20) {
          this.commonService.openSnackBarError(`Dung lượng tệp ${file.name} vượt quá giới hạn cho phép (20 MB). Vui lòng chọn tệp nhỏ hơn.`);
        }
        if (file.type?.includes('image/') && size < 20)
          arr.push(file)
        return arr
      }, []) || []
      this.noteForm.patchValue({
        image: [...this.noteForm.value.image || [], ..._files],
      })
    } else {
      const _files: any = Array.from(event.target.files).reduce((arr: any, file: any) => {
        const size = file.size / (1024 * 1024);
        if (size >= 20) {
          this.commonService.openSnackBarError(`Dung lượng tệp ${file.name} vượt quá giới hạn cho phép (20 MB). Vui lòng chọn tệp nhỏ hơn.`);
        }
        if (size < 20)
          arr.push(file)
        return arr
      }, []) || []
      this.noteForm.patchValue({
        file: [...this.noteForm.value.file || [], ..._files],
      })
    }
    // this.noteForm.controls.inputFile.reset()
    // this.noteForm.controls.inputImage.reset()
  }

  addApproval() {
    this.addApprovalDialogSetting.header = 'Thêm phê duyệt'
    // this.addApprovalChild.imagesUpdate = [];
    // this.addApprovalChild.attachFiles = [];
    this.showAddApproval = true;
  }

  async closedAddApproval() {
    this.showAddApproval = false;
    this.approvalFilter.page = 1;
    this.approvalFilter.size = 20;
    this.approvals = [];
    this.originApprovals = [];
    this.updateApprovalData = null;
    await this.onGetApprovalList()
  }

  async onSubmitCC() {
    let args = {
      approvalId: this.approvalSelected?.id,
      subscriberIds: this.approvalSelected.subscriberIds ? [...this.approvalSelected.subscriberIds, ...this.subscriberIdsCtr.value] : this.subscriberIdsCtr.value
    }

    const response = await this.guestService.officeApprovalSubscriberUpdate(args)
    if (response) {
      this.commonService.openSnackBar(`Cập nhật thành công`);
      this.isUpdateSubscribers = false;
      this.showUpdateSub = false;
      this.onSelectApproval(this.approvalSelected?.id);
    } else {
      this.commonService.openSnackBarError(`Cập nhật thất bại`);
    }
  }

  async removeSubcribers(item: any) {
    let args = {
      approvalId: this.approvalSelected?.id,
      subscriberIds: this.approvalSelected.subscriberIds.filter((x: any) => x != item.id)
    }

    const response = await this.guestService.officeApprovalSubscriberUpdate(args)
    if (response) {
      this.commonService.openSnackBar(`Cập nhật thành công`);
      this.isUpdateSubscribers = false;
      this.showUpdateSub = false;
      this.onSelectApproval(this.approvalSelected?.id);
    } else {
      this.commonService.openSnackBarError(`Cập nhật thất bại`);
    }
  }

  async onRemoveDraft(id: any) {
    const response = await this.guestService.officeApprovalRemove(id)
    if (response) {
      this.commonService.openSnackBar(`Đã xóa bản nháp`);
      this.approvalFilter.page = 1;
      this.approvalFilter.size = 20;
      this.approvals = [];
      this.originApprovals = [];
      await this.onGetApprovalList()
    }
  }

  async onRemoveFilter(id: any) {
    const response = await this.guestService.officeApprovalFilterRemove(id)
    if (response) {
      this.commonService.openSnackBar(`Đã xóa bộ lọc`);
      this.approvalFilter.page = 1;
      this.approvalFilter.size = 20;
      this.approvals = [];
      this.originApprovals = [];
      this.listFilter = this.listFilter.filter((x: any) => x.id != id);
      this.selectedFilterObj = null;
      const e = {
        source: {
          _value: 0
        }
      }
      this.onTabChange(e)
      // this.selectedTab = this.tabs[0]
      // await this.onGetApprovalList()
    }
  }

  onDraftConfirmDialogClose() {
    this.isConfirmDraft = false;
  }

  onRemoveDraftConfirm(id: any) {
    this.isConfirmDraft = true;
    this.idDeleteDraft = id;
  }

  async onDraftConfirmDialogSubmit() {
    this.onRemoveDraft(this.idDeleteDraft);
    this.isConfirmDraft = false;
  }

  onFilterConfirmDialogClose() {
    this.isConfirmFilter = false;
  }

  onRemoveFilterConfirm(id: any) {
    this.isConfirmFilter = true;
    this.idDeleteFilter = id;
  }

  async onFilterConfirmDialogSubmit() {
    this.onRemoveFilter(this.idDeleteFilter);
    this.isConfirmFilter = false;
  }

  onCloseCreateFilter() {
    this.showCreateFilter = false;
  }

  async onSubmitCreateFilter() {
    let args = {
      name: this.filterName.value,
      filter: this.filterForm.value
    }
    args.filter.createdFrom = this.startDate ? startOfDay(new Date(this.startDate)).getTime() : null,
      args.filter.createdTo = this.endDate ? endOfDay(new Date(this.endDate)).getTime() : null,
      // args.filter.statuses = this.checkStatus(),
      args.filter.keyword = this.filterForm.value.keyword || '',
      args.filter.doneAt = this.startDateDoneAt || this.endDateDoneAt ? {
        start: this.startDateDoneAt ? startOfDay(new Date(this.startDateDoneAt)).getTime() : null,
        end: this.endDateDoneAt ? endOfDay(new Date(this.endDateDoneAt)).getTime() : null,
      } : null
    const response = await this.guestService.officeApprovalFilterCreate(args)
    if (response) {
      this.commonService.openSnackBar(`Thêm bộ lọc thành công`);
      this.showCreateFilter = false;
      this.showFilter = false;
      this.statusEnums.forEach(obj => {
        obj['selected'] = false;
      });
      await this.onGetFilterList();
      this.selectedFilter(response);
      this.isCountFilter = true;
    }
  }

  checkStatusEditFilter(name: any): void {
    if (name == 'Tất cả') {
      if (this.statusEnumsEdit[0].selected) {
        this.statusEnumsEdit = this.statusEnumsEdit.map(data => {
          return {
            ...data,
            selected: true
          }
        })
      }
      if (!this.statusEnumsEdit[0].selected) {
        this.statusEnumsEdit = this.statusEnumsEdit.map((res) => {
          return {
            ...res,
            selected: false
          }
        })
      }
    } else {
      if (this.statusEnumsEdit.slice(1).filter(data => data.selected).length == 6 && !this.statusEnumsEdit[0].selected) {
        this.statusEnumsEdit[0].selected = true
      } else if (this.statusEnumsEdit.slice(1).filter(data => data.selected).length != 6) {
        this.statusEnumsEdit[0].selected = false
      }
    }
  }

  async createAprrovalFilter() {
    this.filterName.setValue('');
    this.showCreateFilter = true;
    this.selectedFilterObj = null;
  }

  async selectedFilter(filter: any) {
    this.resetFilter();
    this.selectedFilterObj = filter;
    this.selectedTab = null
    this.approvalFilter = filter.filter;
    this.approvalFilter.page = 1;
    this.approvalFilter.size = 20;
    await this.onGetApprovalList()
  }

  resetFilter() {
    this.filterForm.reset()
    this.statusEnums.forEach(obj => {
      obj['selected'] = false;
    });
    this.startDate = null;
    this.endDate = null;
    this.startDateDoneAt = null;
    this.endDateDoneAt = null;
  }

  onUpdateFilter(e: any) {
    this.dataFilterUpdate = cloneDeep(e);
    this.showFilterEdit = true;
    this.creatorsOrigin = e.creators;
    this.approvalsOrigin = e.approvals;
    this.filterUpdateForm.patchValue({
      name: this.dataFilterUpdate.name,
      formIds: this.dataFilterUpdate.filter?.formIds,
      type: this.dataFilterUpdate.filter?.type,
      departmentIds: this.dataFilterUpdate.filter?.departmentIds,
      creatorIds: this.dataFilterUpdate.filter?.creatorIds,
      approvalIds: this.dataFilterUpdate.filter?.approvalIds,
      yourAction: this.dataFilterUpdate.filter?.yourAction,
      statuses: this.dataFilterUpdate.filter?.statuses,
    })
    this.startDateEdit = e.filter?.createdFrom ? new Date(e.filter?.createdFrom) : null;
    this.endDateEdit = e.filter?.createdTo ? new Date(e.filter?.createdTo) : null;
    this.startDateDoneAtEdit = e.filter?.doneAt?.start ? new Date(e.filter?.doneAt?.start) : null;
    this.endDateDoneAtEdit = e.filter?.doneAt?.end ? new Date(e.filter?.doneAt?.end) : null;
    // this.statusEnumsEdit.forEach(obj => {
    //     if (e.filter?.statuses?.includes(obj.value))
    //     obj['selected'] = true;
    // });
    // if (e.filter?.statuses && e.filter?.statuses.length == 6) {
    //     this.statusEnumsEdit[0].selected = true
    // }
  }

  onSelectApproverCustom(event: any) {
    let item = this.approverList.find((item: any) => item.id === event.value)
    item.role = RoleApproveCreate.Approve;
    this.approverSelectedList.push(item)
    // this.inputForm.patchValue({
    //     approverId: null,
    //     approverSearch: null
    // })
    // this.inputForm.controls.approverId.clearValidators()
    // this.inputForm.controls.approverId.updateValueAndValidity()
  }

  openAddApproverDialog() {
    this.addApproverDialog = true;
    this.progressForm.patchValue({
      note: null
    })

    this.progressData = this.approvalSelected?.steps?.map((x: any) => {
      x['default'] = true;
      return x;
    });
  }

  onRemoveApproverCustom(index: any) {
    this.progressData.splice(index, 1)
  }

  approverSelected(e: any) {
    e.role = RoleApproveCreate.Approve;
    this.progressData.push(
      {
        users: [{fullname: e.fullname, id: e.id, optionTitle: e.optionTitle}],
        approvalAction: RoleApproveCreate.Approve
      }
    )
    this.progressForm.patchValue({approver: null})
  }

  drop(event: CdkDragDrop<string[]>) {
    if (this.progressData[event.previousIndex]?.actionAt || this.progressData[event.currentIndex]?.actionAt) {
      return;
    }
    moveItemInArray(this.progressData, event.previousIndex, event.currentIndex);
  }

  async onSubmitAddApproverDialog() {
    const find = this.progressData[this.progressData.length - 1]
    if (find && find.approvalAction == RoleApproveCreate.Consent) {
      this.commonService.openSnackBarError('Người ở cuối tiến trình phải có vài trò là người phê duyệt')
      return
    }
    const newSteps = this.progressData.filter((x: any) => !x.actionAt)?.map((x: any) => {
      const step = {
        action: x.approvalAction,
        approveBy: x.approvalAction == RoleApproveCreate.Approve ? [x.users[0].id] : [],
        consentBy: x.approvalAction == RoleApproveCreate.Consent ? [x.users[0].id] : []
      }
      return step
    })
    const args = {
      approvalId: this.approvalSelected.id,
      note: this.progressForm.value.note,
      newSteps: newSteps
    };

    const response = await this.guestService.officeApprovalApproveStepUpdate(args);
    if (response) {
      this.commonService.openSnackBar('Cập nhật luồng phê duyệt thành công')
      this.onSelectApproval(response.id)
      this.addApproverDialog = false
    } else {
      this.commonService.openSnackBar('Cập nhật luồng phê duyệt thất bại')
    }
  }

  getColorForChar(char: string) {
    return getColorForChar(char)
  }

  getLogFieldName(e: any) {
    switch (e) {
      case 'status':
        return 'Trạng thái'
      case 'priority':
        return 'Độ ưu tiên'
      case 'description':
        return 'Nội dung'
      case 'startTime':
        return 'Thời gian bắt đầu'
      case 'finishTime':
        return 'Thời gian kết thúc'
      case 'doneAt':
        return 'Thời gian hoàn thành'
      case 'assigned':
        return 'Người nhận'
      case 'reporter':
        return 'Người giao việc'
      case 'watchers':
        return 'Người theo dõi'
      case 'attachmentIds':
        return 'Tệp đính kèm'
      case 'startTimeIn':
        return 'Thời gian tạo'
      case 'workDays':
        return 'Thời gian hoàn thành'
      case 'periodType':
        return 'Loại lặp lại'
      case 'startAt':
        return 'Ngày bắt đầu (chu kỳ)'
      case 'endAt':
        return 'Ngày kết thúc (chu kỳ)'
      case 'assignees':
        return 'Người nhận'
      case 'weekDays':
        return 'Thứ lặp lại trong tuần'
      case 'monthDays':
        return 'Ngày lặp lại trong tháng'
      case 'pipe_approve':
        return 'Cập nhật luồng phê duyệt'
      default:
        return ''
    }
  }

  onCloseForward(e: any) {
    this.updateApprovalData = null;
    this.showForwardApproval = false;
  }

  forward() {
    this.showForwardApproval = true;
    this.updateApprovalData = this.approvalSelected
  }

  changeShowContent(showItems: any) {
    this.isShowContent.forEach(x => {
      if (showItems.includes(x.key))
        x.show = true
      else
        x.show = false
    })
  }

  changeUser(e: any) {
    this.changeShowContent(this.approvalSelected?.forward?.users[e.index].showItems)
  }

  onAddComment(e: any) {
    if (e) {
      this.onSelectItemApproval(this.approvalSelected?.id)
    }
  }
}

export enum LineApprove {
  Approve = 'User',
  Approve_Parallel = 'Approve_Parallel',
  Approve_Level = 'Approve_Level',
  Approve_Department = 'Department',
  Notification = 'Notification',
  Consent = 'Consent'
}
