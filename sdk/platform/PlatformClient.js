const {
  CustomerValidator,
  CreditValidator,
  MultiKycValidator,
} = require("./PlatformModels");
const PlatformApplicationClient = require("./PlatformApplicationClient");
const Paginator = require("../common/Paginator");
const PlatformAPIClient = require("./PlatformAPIClient");
const { FDKClientValidationError } = require("../common/FDKError");

class PlatformClient {
  constructor(config) {
    this.config = config;
    this.customer = new Customer(config);
    this.credit = new Credit(config);
    this.multiKyc = new MultiKyc(config);
  }
  application(applicationId) {
    if (typeof applicationId == "string") {
      return new PlatformApplicationClient(applicationId, this.config);
    }
    throw new Error(
      `Application Id should be of type string, ${typeof applicationId} provided`
    );
  }

  setExtraHeaders(header) {
    if (typeof header === "object") {
      this.config.extraHeaders.push(header);
    } else {
      throw new FDKClientValidationError("Context value should be an object");
    }
  }
}

/**
 * @typedef UserSchema
 * @property {string} [id]
 * @property {string} [firstName]
 * @property {string} [lastName]
 * @property {string} [countryCode]
 * @property {string} [mobile]
 * @property {string} [email]
 * @property {string} [gender]
 * @property {string} [dob]
 * @property {boolean} [active]
 * @property {string} [profilePicUrl]
 * @property {boolean} [isEmailVerified]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [deletedAt]
 */

/**
 * @typedef count
 * @property {string} [totalUsers]
 */

/**
 * @typedef FilterByDate
 * @property {string} [startDate]
 * @property {string} [endDate]
 */

/**
 * @typedef LenderCount
 * @property {string} [totalLenders]
 */

/**
 * @typedef LenderSchema
 * @property {string} [id]
 * @property {string} [name]
 * @property {boolean} [active]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [deletedAt]
 */

/**
 * @typedef TotalUsersPerLender
 * @property {Filters[]} filters
 * @property {PageResponse} page
 * @property {TotalUsersPerLenderData[]} lenderList
 */

/**
 * @typedef TotalUsersPerLenderData
 * @property {string} [id]
 * @property {string} [name]
 * @property {boolean} [active]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [deletedAt]
 * @property {string} [totalUsers]
 */

/**
 * @typedef TotalUserByLender
 * @property {string} [name]
 * @property {string} [count]
 */

/**
 * @typedef UsersByLender
 * @property {string} [firstName]
 * @property {string} [lastName]
 * @property {string} [mobile]
 * @property {string} [email]
 * @property {string} [name]
 */

/**
 * @typedef ErrorResponse
 * @property {string} [message]
 * @property {string} [info]
 * @property {string} [code]
 * @property {string} [requestId]
 * @property {Object} [meta]
 */

/**
 * @typedef EditProfileRequest
 * @property {string} [firstName]
 * @property {string} [lastName]
 * @property {string} [countryCode]
 * @property {string} [mobile]
 * @property {string} [email]
 * @property {string} [gender]
 * @property {string} [dob]
 * @property {string} [registrationToken]
 */

/**
 * @typedef VerifyOtpRequest
 * @property {string} requestId
 * @property {string} otp
 * @property {string} [captchaCode]
 * @property {string} [androidHash]
 * @property {string} [referralCode]
 * @property {string} [onboardingToken]
 */

/**
 * @typedef SendMobileOtpRequest
 * @property {string} countryCode
 * @property {string} mobile
 * @property {string} [captchaCode]
 * @property {string} [androidHash]
 * @property {string} [force]
 */

/**
 * @typedef ReSendMobileOtpRequest
 * @property {string} [captchaCode]
 * @property {string} token
 * @property {string} [androidHash]
 */

/**
 * @typedef SendOtpRequest
 * @property {string} [countryCode]
 * @property {string} [captchaCode]
 * @property {string} [mobile]
 */

/**
 * @typedef ApplicationUser
 * @property {UserSchema} [user]
 */

/**
 * @typedef SendOtpResponse
 * @property {number} [resendTimer]
 * @property {string} [resendToken]
 * @property {boolean} [success]
 * @property {string} [requestId]
 * @property {string} [message]
 * @property {string} [mobile]
 * @property {string} [countryCode]
 * @property {string} [email]
 * @property {string} [resendEmailToken]
 * @property {string} [registerToken]
 * @property {boolean} [verifyEmailOtp]
 * @property {boolean} [verifyMobileOtp]
 * @property {boolean} [userExists]
 */

/**
 * @typedef EmailUpdate
 * @property {string} [email]
 */

/**
 * @typedef UserUpdateRequest
 * @property {Object} [firstName]
 * @property {Object} [lastName]
 * @property {string} countryCode
 * @property {string} mobile
 * @property {Object} [email]
 * @property {Object} [gender]
 * @property {Object} [dob]
 * @property {boolean} [active]
 * @property {Object} [profilePictureUrl]
 * @property {boolean} [isEmailVerified]
 */

/**
 * @typedef LenderUpdateRequest
 * @property {string} id
 * @property {string} [name]
 * @property {boolean} [active]
 */

/**
 * @typedef ProfileEditSuccess
 * @property {UserSchema} [user]
 * @property {string} [registerToken]
 * @property {string} [resendEmailToken]
 * @property {boolean} [userExists]
 * @property {boolean} [verifyEmailLink]
 * @property {boolean} [verifyEmailOtp]
 * @property {boolean} [verifyMobileOtp]
 * @property {string} [email]
 * @property {string} [requestId]
 * @property {string} [countryCode]
 * @property {string} [mobile]
 * @property {boolean} [success]
 * @property {string} [message]
 * @property {number} [resendTimer]
 * @property {string} [resendToken]
 */

/**
 * @typedef LoginSuccess
 * @property {UserSchema} [user]
 * @property {string} [requestId]
 * @property {string} [registerToken]
 */

/**
 * @typedef VerifyOtpSuccess
 * @property {UserSchema} [user]
 * @property {boolean} [userExists]
 * @property {boolean} [isNew]
 */

/**
 * @typedef LogoutSuccess
 * @property {boolean} [logout]
 */

/**
 * @typedef OtpSuccess
 * @property {number} [resendTimer]
 * @property {string} [resendToken]
 * @property {string} [registerToken]
 * @property {boolean} [success]
 * @property {string} [requestId]
 * @property {string} [message]
 * @property {string} [mobile]
 * @property {boolean} [isNew]
 * @property {string} [countryCode]
 * @property {number} [otpLength]
 */

/**
 * @typedef SessionListSuccess
 * @property {string[]} [sessions]
 */

/**
 * @typedef VerifyMobileOTPSuccess
 * @property {UserSchema} [user]
 */

/**
 * @typedef Location
 * @property {number} [latitude]
 * @property {number} [longitude]
 */

/**
 * @typedef OrderAddress
 * @property {string} [line1]
 * @property {string} [line2]
 * @property {string} [city]
 * @property {string} [state]
 * @property {string} [country]
 * @property {string} [pincode]
 * @property {string} [type]
 * @property {Location} [geoLocation]
 */

/**
 * @typedef CustomerObject
 * @property {string} [countryCode]
 * @property {string} mobile
 * @property {string} uid
 * @property {string} [email]
 * @property {string} [firstname]
 * @property {string} [middleName]
 * @property {string} [lastName]
 */

/**
 * @typedef Order
 * @property {number} valueInPaise
 * @property {string} uid
 * @property {number} [emiTenure]
 * @property {Items[]} [items]
 * @property {OrderAddress} [shippingAddress]
 * @property {OrderAddress} [billingAddress]
 */

/**
 * @typedef OrderUid
 * @property {number} [valueInPaise]
 * @property {string} uid
 * @property {Items[]} [items]
 * @property {OrderAddress} [shippingAddress]
 * @property {OrderAddress} [billingAddress]
 */

/**
 * @typedef CustomerMeta
 * @property {string} ip
 * @property {string} appVersion
 * @property {string} [appIdentifier]
 * @property {string} [customerUserAgent]
 * @property {string} deviceId
 */

/**
 * @typedef Device
 * @property {string} ipAddress
 * @property {string} userAgent
 * @property {number} [latitude]
 * @property {number} [longitude]
 */

/**
 * @typedef VerifyCustomer
 * @property {CustomerObject} customer
 * @property {Order} order
 * @property {Device} device
 * @property {Object} [meta]
 * @property {boolean} [fetchLimitOptions]
 */

/**
 * @typedef CreateTransaction
 * @property {boolean} [autoCapture]
 * @property {string} redirectUrl
 * @property {CustomerObject} customer
 * @property {Order} order
 * @property {Device} device
 * @property {Object} [meta]
 */

/**
 * @typedef ResendPaymentRequest
 * @property {boolean} [autoCapture]
 * @property {string} [redirectUrl]
 * @property {CustomerObject} customer
 * @property {OrderUid} order
 */

/**
 * @typedef VerifyCustomerSuccess
 * @property {string} [status]
 * @property {string} [userStatus]
 * @property {string} [message]
 * @property {Object} [__headers]
 */

/**
 * @typedef CreateTransactionSuccess
 * @property {string} [chargeToken]
 * @property {string} [redirectUrl]
 * @property {string} message
 * @property {string} [transactionId]
 * @property {string} [status]
 * @property {string} [userStatus]
 * @property {Object} [__headers]
 */

/**
 * @typedef SupportDocuments
 * @property {string} [fileName]
 * @property {string} [fileUrl]
 */

/**
 * @typedef CreateTicketResponse
 * @property {string} [serviceRequestId]
 * @property {string} [message]
 */

/**
 * @typedef CreateTicket
 * @property {string} category
 * @property {string} [transactionId]
 * @property {string} description
 * @property {SupportDocuments[]} [documents]
 */

/**
 * @typedef InitiateTransactions
 * @property {string} token
 */

/**
 * @typedef GetMobileFromToken
 * @property {string} token
 */

/**
 * @typedef GetDataFromToken
 * @property {string} token
 */

/**
 * @typedef MerchantDetails
 * @property {string} [name]
 * @property {string} [website]
 * @property {string} [logo]
 */

/**
 * @typedef InitiateTransactionsSuccess
 * @property {string} chargeToken
 * @property {string} [session]
 * @property {string} [expiry]
 * @property {string} [hash]
 * @property {Order} [order]
 * @property {boolean} [isAsp]
 * @property {MerchantDetails} [merchant]
 */

/**
 * @typedef RetrieveMobileFromToken
 * @property {string} countryCode
 * @property {string} mobile
 */

/**
 * @typedef CreateDashboardTemplateRequest
 * @property {string} name
 * @property {string} version
 * @property {boolean} [isDefault]
 * @property {TemplateSections[]} sections
 */

/**
 * @typedef TemplateSections
 * @property {number} sequence
 * @property {boolean} isAvailableInMobile
 * @property {boolean} isAvailableInDesktop
 * @property {TemplateComponent} component
 */

/**
 * @typedef TemplateComponent
 * @property {string} name
 * @property {string} description
 * @property {boolean} [isAvailableInDesktop]
 * @property {PartnerApplications[]} [partnerApplications]
 * @property {Banners[]} [banners]
 * @property {Tips[]} [tips]
 */

/**
 * @typedef PartnerApplications
 * @property {string} name
 * @property {string} [description]
 * @property {string} [urlPath]
 * @property {string} [urlTarget]
 * @property {string} imageUrl
 * @property {number} [sequence]
 */

/**
 * @typedef Offerings
 * @property {string} name
 * @property {string} [description]
 * @property {string} [urlPath]
 * @property {string} [urlTarget]
 * @property {string} imageUrl
 * @property {number} [sequence]
 * @property {string[]} gradient
 */

/**
 * @typedef Banners
 * @property {string} imageUrl
 * @property {ActionSchema} [action]
 */

/**
 * @typedef Tips
 * @property {string} [name]
 * @property {string} [description]
 * @property {string} urlPath
 * @property {string} [urlTarget]
 * @property {string} [imageUrl]
 * @property {number} [sequence]
 */

/**
 * @typedef DashboardTemplateResponse
 * @property {string} [id]
 * @property {string} [name]
 * @property {string} [version]
 * @property {boolean} [active]
 * @property {SectionSchema[]} sections
 */

/**
 * @typedef SectionSchema
 * @property {string} type
 * @property {string} [title]
 * @property {string} [description]
 * @property {PartnerApplicationsResponse[]} [partners]
 * @property {BannersResponse[]} [banners]
 * @property {TipsResponse[]} [tips]
 */

/**
 * @typedef PartnerApplicationsResponse
 * @property {string} [id]
 * @property {string} name
 * @property {string} [description]
 * @property {ActionSchema} action
 * @property {string} imageUrl
 */

/**
 * @typedef OfferingsResponse
 * @property {string} [id]
 * @property {string} name
 * @property {string} [description]
 * @property {ActionSchema} action
 * @property {string} imageUrl
 * @property {string[]} gradient
 */

/**
 * @typedef BannersResponse
 * @property {ActionSchema} [action]
 * @property {string} imageUrl
 */

/**
 * @typedef TipsSection
 * @property {TipsResponse[]} [tips]
 * @property {TipsCategories[]} [categories]
 * @property {ActionSchema} [action]
 */

/**
 * @typedef TipsResponse
 * @property {string} [name]
 * @property {string} [category]
 * @property {string} [description]
 * @property {ActionSchema} action
 * @property {string} [imageUrl]
 */

/**
 * @typedef TipsCategories
 * @property {string} id
 * @property {string} title
 */

/**
 * @typedef ActionSchema
 * @property {string} [type]
 * @property {PageSchema} [page]
 * @property {PageSchema} [popup]
 */

/**
 * @typedef UpdateDashboardTemplateRequest
 * @property {string} id
 * @property {string} [name]
 * @property {string} [version]
 * @property {boolean} [isDefault]
 * @property {boolean} [active]
 * @property {UpdateTemplateSections[]} [sections]
 */

/**
 * @typedef UpdateTemplateSections
 * @property {string} id
 * @property {number} [sequence]
 * @property {boolean} [isAvailableInMobile]
 * @property {boolean} [isAvailableInDesktop]
 * @property {boolean} [active]
 * @property {UpdateTemplateComponent} [component]
 */

/**
 * @typedef UpdateTemplateComponent
 * @property {string} id
 * @property {string} [name]
 * @property {string} [description]
 * @property {boolean} [isAvailableInDesktop]
 * @property {boolean} [active]
 * @property {UpdatePartnerApplications[]} [partners]
 * @property {UpdateBanners[]} [banners]
 * @property {UpdateTips[]} [tips]
 */

/**
 * @typedef UpdatePartnerApplications
 * @property {string} id
 * @property {string} [name]
 * @property {string} [description]
 * @property {Object} [action]
 * @property {string} [imageUrl]
 * @property {number} [sequence]
 * @property {boolean} [active]
 */

/**
 * @typedef UpdateOfferings
 * @property {string} id
 * @property {string} [name]
 * @property {string} [description]
 * @property {string} [urlPath]
 * @property {string} [urlTarget]
 * @property {string} [imageUrl]
 * @property {number} [sequence]
 * @property {string[]} [gradient]
 */

/**
 * @typedef UpdateBanners
 * @property {string} id
 * @property {string} [imageUrl]
 * @property {Object} [action]
 * @property {number} [sequence]
 * @property {boolean} [active]
 */

/**
 * @typedef UpdateTips
 * @property {string} id
 * @property {string} [name]
 * @property {string} [description]
 * @property {string} [imageUrl]
 * @property {Object} [action]
 * @property {number} [sequence]
 * @property {boolean} [active]
 */

/**
 * @typedef NavigationsMobileResponse
 * @property {TabsSchema[]} tabs
 * @property {ProfileSectionSchema[]} profileSections
 */

/**
 * @typedef TabsSchema
 * @property {string} title
 * @property {PageSchema} page
 * @property {string} icon
 * @property {string} activeIcon
 * @property {boolean} active
 */

/**
 * @typedef PageSchema
 * @property {string} [link]
 * @property {PageType} [type]
 * @property {Object} [params]
 * @property {Object} [query]
 */

/**
 * @typedef ProfileSectionSchema
 * @property {string} title
 * @property {ProfileNavigationSchema[]} navigations
 * @property {boolean} active
 */

/**
 * @typedef ProfileNavigationSchema
 * @property {string} title
 * @property {string} [description]
 * @property {string} icon
 * @property {string} type
 * @property {ActionSchema} [action]
 * @property {boolean} [active]
 */

/**
 * @typedef SendPNSRegisterRequest
 * @property {string} deviceId
 * @property {string} deviceType
 * @property {string} token
 */

/**
 * @typedef PNSRegisterResponse
 * @property {boolean} [status]
 * @property {string} [message]
 */

/**
 * @typedef FaqResponse
 * @property {CategorySchema[]} [categories]
 */

/**
 * @typedef CategorySchema
 * @property {string} uid
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [logo]
 * @property {QuestionSchema[]} [questions]
 */

/**
 * @typedef QuestionSchema
 * @property {string} uid
 * @property {string} [title]
 * @property {string} [description]
 * @property {number} [displayOrder]
 * @property {boolean} [canRaiseRequest]
 */

/**
 * @typedef SupportCategories
 * @property {string} [kind]
 * @property {string} [display]
 */

/**
 * @typedef SupportCategoriesResponse
 * @property {SupportCategories[]} [categories]
 */

/**
 * @typedef SanctionLetterResponse
 * @property {string} sanctionedLetterFileUrl
 */

/**
 * @typedef KfsDocumentResponse
 * @property {string} kfsFileUrl
 */

/**
 * @typedef UserWhiteListedResponse
 * @property {string} [status]
 */

/**
 * @typedef UserConsentRequest
 * @property {string[]} [consents]
 */

/**
 * @typedef Consents
 * @property {string} [type]
 * @property {string} [text]
 */

/**
 * @typedef UserConsentRequestV2
 * @property {Consents[]} [consents]
 */

/**
 * @typedef UserConsentResponse
 * @property {boolean} [success]
 */

/**
 * @typedef UserKycSteps
 * @property {string} [id]
 * @property {string} [index]
 * @property {string} [name]
 * @property {Object} [rules]
 * @property {boolean} [active]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [deletedAt]
 */

/**
 * @typedef CreateKycStepRequest
 * @property {string} name
 * @property {string} index
 * @property {boolean} active
 * @property {Object} [rules]
 */

/**
 * @typedef RemoveKycStepRequest
 * @property {string} [name]
 * @property {string} index
 * @property {boolean} [active]
 * @property {Object} [rules]
 */

/**
 * @typedef KycUpdateMessage
 * @property {string} [message]
 */

/**
 * @typedef MobileFromLinkingRequest
 * @property {string} token
 */

/**
 * @typedef MobileFromLinkingResponse
 * @property {string} countryCode
 * @property {string} mobile
 */

/**
 * @typedef SessionFromLinkingRequest
 * @property {string} token
 */

/**
 * @typedef SessionFromLinkingResponse
 * @property {string} session
 * @property {number} expiry
 */

/**
 * @typedef LinkAccount
 * @property {CustomerObject} customer
 * @property {string} redirectUrl
 * @property {Device} device
 */

/**
 * @typedef LinkAccountSuccess
 * @property {string} [redirectUrl]
 * @property {number} [statusCode]
 * @property {string} [status]
 * @property {string} [message]
 * @property {string} [errorCode]
 * @property {Object} [__headers]
 */

/**
 * @typedef UnlinkAccount
 * @property {CustomerObject} customer
 * @property {Device} device
 */

/**
 * @typedef UnlinkAccountSuccess
 * @property {string} status
 * @property {string} message
 * @property {number} statusCode
 * @property {string} [userStatus]
 * @property {string} [errorCode]
 * @property {Object} [__headers]
 */

/**
 * @typedef Refund
 * @property {string} [fingerprint]
 * @property {CustomerObject} customer
 * @property {Items[]} [refundItems]
 * @property {string} orderId
 * @property {string} refundId
 * @property {number} refundAmount
 */

/**
 * @typedef Translation
 * @property {Object} [content]
 */

/**
 * @typedef FilterKeys
 * @property {string} [display]
 * @property {string} [name]
 * @property {string} [kind]
 */

/**
 * @typedef FilterValues
 * @property {string} [display]
 * @property {boolean} [isSelected]
 * @property {string} [value]
 */

/**
 * @typedef Filters
 * @property {FilterKeys} [key]
 * @property {FilterValues[]} [values]
 */

/**
 * @typedef PageResponse
 * @property {string} type
 * @property {number} current
 * @property {boolean} hasPrevious
 * @property {boolean} hasNext
 * @property {number} size
 * @property {number} itemTotal
 */

/**
 * @typedef UserResponse
 * @property {Filters[]} filters
 * @property {PageResponse} page
 * @property {UserSchema[]} listOfUsers
 */

/**
 * @typedef UserDetailRequest
 * @property {string} id
 */

/**
 * @typedef UserConsents
 * @property {string} [id]
 * @property {string} [userId]
 * @property {string} [ipAddress]
 * @property {string} [text]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [deletedAt]
 */

/**
 * @typedef CreditScoreSchema
 * @property {string} [id]
 * @property {string} [userId]
 * @property {number} [cibil]
 * @property {string} [finbox]
 * @property {string} [systemAwarded]
 * @property {boolean} [isActive]
 * @property {string} [deletedAt]
 * @property {string} [updatedAt]
 * @property {string} [createdAt]
 */

/**
 * @typedef CreditLimitSchema
 * @property {string} [id]
 * @property {string} [userId]
 * @property {string} [creditLimit]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [deletedAt]
 */

/**
 * @typedef Screen
 * @property {string} [screenType]
 * @property {string} [name]
 * @property {string} [link]
 */

/**
 * @typedef UserStateSchema
 * @property {Screen} [screen]
 */

/**
 * @typedef GetAccessTokenResponse
 * @property {boolean} [success]
 * @property {string} [accessToken]
 * @property {string} [refreshToken]
 * @property {string} [tokenExpireAt]
 * @property {string} [tokenExpiryIn]
 * @property {string} [refreshTokenExpiryAt]
 * @property {string} [refreshTokenExpiryIn]
 * @property {string[]} [scope]
 * @property {Object} [__headers]
 */

/**
 * @typedef RefreshTokenResponse
 * @property {boolean} [success]
 * @property {string} [accessToken]
 * @property {string} [tokenExpireAt]
 * @property {string} [tokenExpiryIn]
 * @property {Object} [__headers]
 */

/**
 * @typedef RefreshTokenRequest
 * @property {string} token
 */

/**
 * @typedef Items
 * @property {string} [category]
 * @property {string} [sku]
 * @property {number} [rate]
 * @property {number} [quantity]
 */

/**
 * @typedef RefundStatusList
 * @property {string} [id]
 * @property {Items[]} [orderItems]
 * @property {number} [amount]
 * @property {string} [status]
 * @property {string} [createdAt]
 * @property {string} [processedDate]
 */

/**
 * @typedef RefundStatus
 * @property {string} [orderId]
 * @property {string} [userId]
 * @property {string} [merchantId]
 * @property {string} [lenderId]
 * @property {string} [loanAccountNumber]
 * @property {RefundStatusList[]} [refund]
 * @property {Object} [__headers]
 */

/**
 * @typedef CustomerMetricsPivots
 * @property {string} [date]
 * @property {number} [sum]
 */

/**
 * @typedef CustomerMetricsSubResponse
 * @property {string} [total]
 * @property {CustomerMetricsPivots[]} [pivots]
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [valueFormat]
 * @property {string} [logo]
 */

/**
 * @typedef CustomerMetricsAnalytics
 * @property {CustomerMetricsSubResponse} [totalCustomers]
 * @property {CustomerMetricsSubResponse} [source]
 */

/**
 * @typedef CustomerMetricsFilters
 * @property {string} type
 * @property {string} display
 * @property {string[]} value
 * @property {boolean} [isSelected]
 * @property {boolean} isActive
 */

/**
 * @typedef CustomerMetrics
 * @property {CustomerMetricsAnalytics} [metrics]
 * @property {CustomerMetricsFilters[]} [filters]
 * @property {CustomerMetricsFilters[]} [sort]
 */

/**
 * @typedef CustomerMetricsResponse
 * @property {CustomerMetrics} [data]
 */

/**
 * @typedef CustomerMetricsRequest
 * @property {CustomerMetricsFilters[]} [filters]
 * @property {CustomerMetricsFilters[]} [sort]
 * @property {string} [merchantId]
 * @property {string} [lenderId]
 * @property {number} [pivotPoints]
 */

/**
 * @typedef SourceAnalyticsRequest
 * @property {CustomerMetricsFilters[]} [filters]
 */

/**
 * @typedef LenderResponse
 * @property {string} [slug]
 * @property {string} [name]
 * @property {string} [logo]
 */

/**
 * @typedef CreditLimitObject
 * @property {number} [availableLimit]
 * @property {number} [possibleLimit]
 * @property {LenderResponse} [lender]
 */

/**
 * @typedef BusinessDetails
 * @property {string} category
 * @property {string} [shopName]
 * @property {string} legalName
 * @property {string} [address]
 * @property {string} [type]
 * @property {string} [pincode]
 */

/**
 * @typedef DocumentItems
 * @property {string} [number]
 * @property {string} [category]
 * @property {string} [type]
 * @property {string} [name]
 * @property {string} [issuedOn]
 * @property {string} [issuedAt]
 * @property {string} [issuedBy]
 * @property {string} [expiryOn]
 */

/**
 * @typedef VintageItems
 * @property {number} month
 * @property {number} year
 * @property {number} totalTransactions
 * @property {number} totalTransactionAmount
 * @property {number} [totalCancellations]
 * @property {number} [totalCancellationAmount]
 */

/**
 * @typedef EligibilitySuccess
 * @property {string} [status]
 * @property {string} [message]
 * @property {string} [redirectUrl]
 * @property {string} [callbackUrl]
 * @property {CreditLimitObject[]} [creditLimits]
 * @property {Object} [__headers]
 */

/**
 * @typedef CheckEligibilityRequest
 * @property {CustomerObject} customer
 * @property {Order} [order]
 * @property {BusinessDetails} [businessDetails]
 * @property {DocumentItems[]} [documents]
 * @property {Device} device
 * @property {VintageItems[]} [vintage]
 * @property {Object} [meta]
 * @property {boolean} [fetchLimitOptions]
 */

/**
 * @typedef GetSchemesSuccess
 * @property {string} [userId]
 * @property {undefined[]} lenders
 * @property {Object} [__headers]
 */

/**
 * @typedef DisbursalRequest
 * @property {string} [fingerprint]
 * @property {string} chargeToken
 * @property {number} [loanTypeId]
 * @property {number} [emiTenure]
 * @property {boolean} [isDownpaymentRequired]
 * @property {number} [downpaymentAmount]
 * @property {number} [loanAmount]
 */

/**
 * @typedef WorkflowUser
 * @property {string} [mobile]
 */

/**
 * @typedef EligiblePlansRequest
 * @property {string} [chargeToken]
 */

/**
 * @typedef EligiblePlans
 * @property {string} [name]
 * @property {string} [displayName]
 * @property {string} [description]
 * @property {number} [brokenInterest]
 * @property {number} [noOfEmi]
 * @property {number} [emiAmount]
 * @property {number} [processingFee]
 * @property {number} [installmentInterestRate]
 */

/**
 * @typedef EligiblePlansResponse
 * @property {EligiblePlans[]} [eligiblePlans]
 * @property {Object} [__headers]
 */

/**
 * @typedef DisbursalResponse
 * @property {string} [transactionId]
 * @property {string} [status]
 * @property {string} [message]
 * @property {Object} [__headers]
 */

/**
 * @typedef OrderStatus
 * @property {string} orderId
 * @property {string} [transactionId]
 * @property {string} status
 * @property {string} message
 * @property {Object} [__headers]
 */

/**
 * @typedef DisbursalStatusRequest
 * @property {string} [fingerprint]
 * @property {string} transactionId
 */

/**
 * @typedef Transactions
 * @property {string} id
 * @property {string} userId
 * @property {string} [partnerId]
 * @property {string} [partner]
 * @property {string} [partnerLogo]
 * @property {string} status
 * @property {string} [type]
 * @property {string} [remark]
 * @property {number} amount
 * @property {string} [loanAccountNumber]
 * @property {string} [kfs]
 * @property {string} [utr]
 * @property {string} [sanctionLetter]
 * @property {string} [orderId]
 * @property {string} [refundId]
 * @property {string} createdAt
 * @property {string} [lenderId]
 * @property {string} [lenderName]
 * @property {string} [lenderLogo]
 * @property {string} [loanType]
 * @property {string} [repaymentTransactionId]
 * @property {string} [nextDueDate]
 * @property {number} [paidPercent]
 * @property {LenderDetail} [lenderDetail]
 * @property {Emi[]} [emis]
 */

/**
 * @typedef LenderDetail
 * @property {string} [id]
 * @property {string} [name]
 * @property {string} [imageUrl]
 * @property {string} [slug]
 * @property {boolean} [active]
 * @property {boolean} [b2b]
 * @property {boolean} [b2c]
 * @property {Theme} [theme]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [deletedAt]
 */

/**
 * @typedef TransactionResponse
 * @property {Filters[]} filters
 * @property {PageResponse} page
 * @property {Transactions[]} transactions
 */

/**
 * @typedef MerchantTransactions
 * @property {string} [outstandingAmount]
 */

/**
 * @typedef MerchantTransactionSummary
 * @property {MerchantTransactions} [merchantOutstandingSummary]
 */

/**
 * @typedef GetReconciliationFileResponse
 * @property {ReconFile[]} files
 */

/**
 * @typedef ReconFile
 * @property {string} base64
 * @property {string} name
 */

/**
 * @typedef UploadReconciliationFileRequest
 * @property {string} base64File
 * @property {string} [format]
 * @property {string} [lenderId]
 */

/**
 * @typedef UploadReconciliationFileResponse
 * @property {boolean} [success]
 */

/**
 * @typedef TransactionCount
 * @property {string} [totalTransactions]
 */

/**
 * @typedef RefundCount
 * @property {string} [refundTransactions]
 */

/**
 * @typedef OrganizationTransactionsCount
 * @property {number} [count]
 */

/**
 * @typedef OrganizationTransactionsSum
 * @property {number} [sum]
 */

/**
 * @typedef UniqueCustomersInOrg
 * @property {number} [count]
 */

/**
 * @typedef TransactionAmount
 * @property {string} [totalTransactionAmount]
 */

/**
 * @typedef SchemaForOneDayTotal
 * @property {string} [orgId]
 * @property {string} [createdAt]
 * @property {number} [count]
 * @property {string} [sum]
 * @property {string} [refund]
 * @property {string} [difference]
 */

/**
 * @typedef SumofOneDayTransactions
 * @property {SchemaForOneDayTotal[]} [dayTotal]
 */

/**
 * @typedef AverageTransaction
 * @property {number} [average]
 */

/**
 * @typedef AllTransactionsResponse
 * @property {string} [id]
 * @property {string} [userId]
 * @property {string} [partnerId]
 * @property {string} [status]
 * @property {string} [type]
 * @property {string} [remark]
 * @property {number} [amount]
 * @property {string} [loanAccountNumber]
 * @property {string} [createdAt]
 */

/**
 * @typedef TotalRefund
 * @property {string} [totalRefund]
 */

/**
 * @typedef TotalRepayment
 * @property {string} [totalRepayment]
 */

/**
 * @typedef TotalOverDue
 * @property {string} [totalDue]
 */

/**
 * @typedef TotalLoansDisbursed
 * @property {string} [totalLoansDisbursed]
 */

/**
 * @typedef OrganizationTransactionResponse
 * @property {TrFilters[]} filters
 * @property {TrPageResponse} page
 * @property {OrgTransactions[]} transactions
 */

/**
 * @typedef TrFilters
 * @property {TrFilterKeys} [key]
 * @property {TrFilterValues[]} [values]
 */

/**
 * @typedef TrPageResponse
 * @property {string} type
 * @property {number} current
 * @property {boolean} hasPrevious
 * @property {boolean} hasNext
 * @property {number} size
 * @property {number} itemTotal
 */

/**
 * @typedef OrgTransactions
 * @property {string} id
 * @property {string} userId
 * @property {string} [userName]
 * @property {string} [partnerId]
 * @property {string} [partner]
 * @property {string} [partnerLogo]
 * @property {string} status
 * @property {string} [type]
 * @property {string} [remark]
 * @property {number} amount
 * @property {string} [orderId]
 * @property {string} [loanAccountNumber]
 * @property {string} [kfs]
 * @property {string} [sanctionLetter]
 * @property {string} createdAt
 */

/**
 * @typedef TrFilterKeys
 * @property {string} [display]
 * @property {string} [name]
 * @property {string} [kind]
 */

/**
 * @typedef TrFilterValues
 * @property {string} [display]
 * @property {boolean} [isSelected]
 * @property {string} [value]
 */

/**
 * @typedef KfsRequest
 * @property {number} [loanTypeId]
 * @property {string} [chargeToken]
 */

/**
 * @typedef KfsResponse
 * @property {string} [kfsTable]
 */

/**
 * @typedef LenderTransactionState
 * @property {string} [id]
 * @property {number} [stepIndex]
 * @property {string} [lenderId]
 * @property {string} [workflowId]
 * @property {string} [workflowName]
 * @property {string} [parentStateId]
 * @property {string} [workflowUrl]
 * @property {boolean} [isInternal]
 * @property {boolean} [active]
 * @property {number} [ttl]
 * @property {string} [name]
 * @property {string} [type]
 * @property {Object} [inputData]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [deletedAt]
 */

/**
 * @typedef TransactionStateResponse
 * @property {LenderTransactionState[]} [transactionState]
 */

/**
 * @typedef Theme
 * @property {string} [logoUrl]
 * @property {string} [iconUrl]
 * @property {string} [landscapeBgUrl]
 * @property {string} [portraitBgUrl]
 * @property {string} [shortName]
 */

/**
 * @typedef Emi
 * @property {string} [id]
 * @property {string} [userId]
 * @property {number} [installmentno]
 * @property {string} [loanAccountNumber]
 * @property {number} [amount]
 * @property {string} [dueDate]
 * @property {string} [referenceTransactionId]
 * @property {string} [remark]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [entityId]
 * @property {boolean} [paid]
 * @property {boolean} [overdue]
 * @property {string} [repaymentDate]
 */

/**
 * @typedef MetricPivots
 * @property {string} [date]
 * @property {number} [sum]
 */

/**
 * @typedef TransactionMetricSubResponse
 * @property {string} [total]
 * @property {MetricPivots[]} [pivots]
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [valueFormat]
 * @property {string} [logo]
 */

/**
 * @typedef TransactionMetrics
 * @property {TransactionMetricSubResponse} [totalDisbursement]
 * @property {TransactionMetricSubResponse} [totalOverdue]
 * @property {TransactionMetricSubResponse} [totalRepayment]
 */

/**
 * @typedef LenderCustomerTransactionMetricsFilters
 * @property {string} type
 * @property {string} display
 * @property {string[]} value
 * @property {boolean} [isSelected]
 * @property {boolean} isActive
 */

/**
 * @typedef LenderCustomerTransactionMetrics
 * @property {TransactionMetrics} [metrics]
 * @property {LenderCustomerTransactionMetricsFilters[]} [filters]
 * @property {LenderCustomerTransactionMetricsFilters[]} [sort]
 */

/**
 * @typedef LenderCustomerTransactionMetricsResponse
 * @property {Object} [data]
 */

/**
 * @typedef LenderCustomerTransactionMetricsRequest
 * @property {LenderCustomerTransactionMetricsFilters[]} [filters]
 * @property {LenderCustomerTransactionMetricsFilters[]} [sort]
 * @property {string} [startDate]
 * @property {string} [endDate]
 * @property {string} [merchantId]
 * @property {string} [lenderId]
 * @property {number} [pivotPoints]
 */

/**
 * @typedef LenderTheme
 * @property {string} logoUrl
 * @property {string} iconUrl
 * @property {string} landscapeBgUrl
 * @property {string} portraitBgUrl
 * @property {string} shortName
 */

/**
 * @typedef Lender
 * @property {string} [id]
 * @property {string} [name]
 * @property {boolean} [active]
 * @property {string} [imageUrl]
 * @property {string} [slug]
 * @property {LenderTheme} [theme]
 * @property {boolean} [b2b]
 * @property {boolean} [b2c]
 * @property {string} [merchantConfigSchema]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {number} [approvedLimit]
 * @property {string} [deletedAt]
 * @property {Object} [meta]
 * @property {Object} [metaSchema]
 */

/**
 * @typedef UserLender
 * @property {string} id
 * @property {string} userId
 * @property {string} lenderId
 * @property {boolean} [active]
 * @property {string} status
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} [deletedAt]
 * @property {number} approvedLimit
 * @property {string} [entityId]
 * @property {string} [entityMapId]
 */

/**
 * @typedef SourceCreditReport
 * @property {string} id
 * @property {string} userId
 * @property {string} pan
 * @property {string} name
 * @property {string} mobile
 * @property {string} bureau
 * @property {string} score
 * @property {string} report
 * @property {string} [createdAt]
 */

/**
 * @typedef Document
 * @property {string} id
 * @property {string} userId
 * @property {string} imageUrl
 * @property {string} number
 * @property {Object} detail
 * @property {boolean} valid
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} [deletedAt]
 * @property {string} [entityId]
 */

/**
 * @typedef UserKycDetail
 * @property {string} id
 * @property {string} userId
 * @property {string} status
 * @property {string} type
 * @property {string} remark
 * @property {string} profileType
 * @property {boolean} active
 * @property {string} [expiryDate]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [deletedAt]
 * @property {string} lenderId
 * @property {Lender} [lender]
 * @property {string} [entityMapId]
 * @property {string} [entityId]
 */

/**
 * @typedef Form
 * @property {string} [id]
 * @property {string} [name]
 * @property {string} [title]
 * @property {string} [subtitle]
 * @property {string} [action]
 * @property {Object} [form]
 * @property {Object} [uiSchema]
 * @property {string} [workflowId]
 */

/**
 * @typedef LenderKycStepMap
 * @property {string} [id]
 * @property {string} step
 * @property {number} stepIndex
 * @property {string} lenderId
 * @property {boolean} active
 * @property {Object} rules
 * @property {string} profileType
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [deletedAt]
 * @property {string} name
 * @property {string} description
 * @property {string} iconUrl
 * @property {boolean} isInteractive
 * @property {string} [formId]
 * @property {string} [merchantId]
 * @property {Form} form
 * @property {Object} docSchema
 */

/**
 * @typedef UserKycLenderStepMap
 * @property {string} id
 * @property {string} userId
 * @property {string} lenderKycStepMapId
 * @property {string} userKycDetailId
 * @property {string} lenderId
 * @property {Object} ruleState
 * @property {boolean} active
 * @property {string} status
 * @property {string} [documentId]
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} [deletedAt]
 * @property {LenderKycStepMap} [lenderKycStepMap]
 * @property {string} [entityMapId]
 * @property {string} [entityId]
 * @property {string} [updatedBy]
 */

/**
 * @typedef ProofOfIdentity
 * @property {string} dob
 * @property {string} hashedEmail
 * @property {string} gender
 * @property {string} hashedMobileNumber
 * @property {string} name
 */

/**
 * @typedef ProofOfAddress
 * @property {string} careOf
 * @property {string} country
 * @property {string} district
 * @property {string} house
 * @property {string} landmark
 * @property {string} locality
 * @property {string} pincode
 * @property {string} postOffice
 * @property {string} state
 * @property {string} street
 * @property {string} subDistrict
 * @property {string} vtc
 */

/**
 * @typedef EAadhaarData
 * @property {string} aadhaarReferenceNumber
 * @property {string} aadhaarUid
 * @property {string} image
 * @property {ProofOfIdentity} proofOfIdentity
 * @property {ProofOfAddress} proofOfAddress
 * @property {string} [xml]
 * @property {string} [pdf]
 * @property {string} [address]
 */

/**
 * @typedef Consent
 * @property {string} text
 * @property {string} type
 */

/**
 * @typedef ValidatePanRequest
 * @property {string} pan
 * @property {Consent[]} consents
 */

/**
 * @typedef BankDetails
 * @property {string} accountType
 * @property {string} bankName
 * @property {string} ifsc
 * @property {string} accountNumber
 * @property {string} accountHolderName
 */

/**
 * @typedef DocumentData
 * @property {string} [selfie]
 * @property {string} [video]
 * @property {string} [digilockerCode]
 * @property {BankDetails} [bankDetails]
 */

/**
 * @typedef ConfirmPanRequest
 * @property {string} pan
 * @property {string} name
 * @property {string} [entity]
 * @property {string} [merchantId]
 */

/**
 * @typedef LivelinessDetails
 * @property {string} selfie
 * @property {string} video
 */

/**
 * @typedef UploadDocumentRequest
 * @property {Object} [user]
 * @property {Object} [documentData]
 * @property {string} lenderSlug
 * @property {string} kycStep
 * @property {string} [merchantId]
 * @property {string} [entityMapId]
 */

/**
 * @typedef UploadDocumentRequestV1
 * @property {string} kycStep
 * @property {string} entityMapId
 * @property {Object} documentData
 */

/**
 * @typedef UploadDocumentRequestV3
 * @property {string} kycStep
 * @property {string} entityMapId
 * @property {Object} documentData
 */

/**
 * @typedef AadhaarRequest
 * @property {string} [digilockerCode]
 */

/**
 * @typedef UploadAadhaarRequest
 * @property {AadhaarRequest} [documentData]
 * @property {Object} [user]
 * @property {string} lenderSlug
 * @property {string} kycStep
 * @property {string} [merchantId]
 * @property {string} [entityMapId]
 */

/**
 * @typedef UploadLivelinessRequest
 * @property {LivelinessDetails} [documentData]
 * @property {Object} [user]
 * @property {string} lenderSlug
 * @property {string} kycStep
 * @property {string} [merchantId]
 * @property {string} [entityMapId]
 */

/**
 * @typedef UploadAadhaarRequestV1
 * @property {AadhaarRequest} documentData
 * @property {string} kycStep
 * @property {string} entityMapId
 */

/**
 * @typedef UploadLivelinessRequestV1
 * @property {LivelinessDetails} documentData
 * @property {string} kycStep
 * @property {string} entityMapId
 */

/**
 * @typedef UploadAadhaarRequestV2
 * @property {AadhaarRequest} [documentData]
 * @property {Object} [user]
 * @property {string} lenderSlug
 * @property {string} kycStep
 * @property {string} [merchantId]
 * @property {string} [entityMapId]
 */

/**
 * @typedef UploadLivelinessRequestV2
 * @property {LivelinessDetails} [documentData]
 * @property {Object} [user]
 * @property {string} lenderSlug
 * @property {string} kycStep
 * @property {string} [merchantId]
 * @property {string} [entityMapId]
 */

/**
 * @typedef UploadAadhaarRequestV3
 * @property {AadhaarRequest} documentData
 * @property {string} kycStep
 * @property {string} entityMapId
 */

/**
 * @typedef UploadLivelinessRequestV3
 * @property {LivelinessDetails} documentData
 * @property {string} kycStep
 * @property {string} entityMapId
 */

/**
 * @typedef UploadBankDetailsRequest
 * @property {BankDetails} [documentData]
 * @property {Object} [user]
 * @property {string} lenderSlug
 * @property {string} kycStep
 * @property {string} [merchantId]
 * @property {string} [entityMapId]
 */

/**
 * @typedef InitiateKycRequest
 * @property {string} kycType
 * @property {string} [kycId]
 * @property {string} [merchantId]
 */

/**
 * @typedef InitiateKycRequestV1
 * @property {string} entityMapId
 * @property {string} kycType
 * @property {string} [kycId]
 * @property {string} [merchantId]
 */

/**
 * @typedef LenderOnboardRequest
 * @property {string} [ack]
 * @property {Object} data
 * @property {string} [entityMapId]
 * @property {string} [merchantId]
 */

/**
 * @typedef UpdateLenderStatusRequest
 * @property {string} status
 * @property {Object} payload
 * @property {Object} data
 * @property {boolean} action
 */

/**
 * @typedef UpdateProfileRequest
 * @property {string} [firstName]
 * @property {string} [lastName]
 * @property {string} [gender]
 * @property {string} [dob]
 * @property {string} userId
 * @property {boolean} [isOnboarded]
 * @property {string} [address]
 */

/**
 * @typedef UpdateEntityRequest
 * @property {string} [name]
 * @property {string} [gender]
 * @property {string} [dob]
 * @property {boolean} [isDefault]
 * @property {ProofOfAddress} [address]
 */

/**
 * @typedef CreateKycStepsRequest
 * @property {Object} data
 */

/**
 * @typedef CreateLenderPgConfigRequest
 * @property {string} mid
 * @property {string} clientId
 * @property {string} secret
 * @property {boolean} active
 * @property {string} pgId
 * @property {string} lenderId
 */

/**
 * @typedef CreateLenderStateRequest
 * @property {Object} data
 */

/**
 * @typedef UpdateLenderRequest
 * @property {Object} data
 * @property {string} lenderId
 */

/**
 * @typedef OtherPolicyFilters
 * @property {Object[]} [orderBy]
 */

/**
 * @typedef GetPolicyFilters
 * @property {string} [policyType]
 * @property {Object[]} [lenderIds]
 * @property {Object[]} [merchantIds]
 * @property {Object[]} [orderBy]
 */

/**
 * @typedef GetPolicyFilters2
 * @property {string} [breType]
 * @property {Object[]} [lenderId]
 * @property {Object[]} [merchantId]
 * @property {string} [loanType]
 * @property {string} [journeyType]
 * @property {string} [subType]
 */

/**
 * @typedef MerchantConfigRequest
 * @property {string} id
 * @property {Object} merchantConfigSchema
 */

/**
 * @typedef PanDetails
 * @property {string} name
 * @property {string} idNumber
 */

/**
 * @typedef AvailableLendersRequest
 * @property {string} chargeToken
 */

/**
 * @typedef InitialData
 * @property {string} userId
 * @property {string} entityId
 */

/**
 * @typedef ExecutePolicyRequest
 * @property {GetPolicyFilters} [policyFilters]
 * @property {InitialData} initialData
 */

/**
 * @typedef ExecutePolicyRequest2
 * @property {GetPolicyFilters2} [policyFilters]
 * @property {InitialData} initialData
 */

/**
 * @typedef RegisterGstRequest
 * @property {string} gstTin
 */

/**
 * @typedef PopulateFormRequest
 * @property {Object} form
 * @property {string} [lenderId]
 * @property {string} [merchantId]
 */

/**
 * @typedef ValidateFormFieldRequest
 * @property {string} workflowName
 * @property {string} [userId]
 * @property {string} [entityId]
 * @property {string} [entityMapId]
 * @property {string} [lenderId]
 * @property {string} [merchantId]
 * @property {Object} fields
 */

/**
 * @typedef MerchantMetricFilter
 * @property {string} type
 * @property {string} display
 * @property {Object[]} value
 * @property {boolean} [isSelected]
 * @property {boolean} [isActive]
 */

/**
 * @typedef LenderCustomerMetricsRequest
 * @property {MerchantMetricFilter[]} [sort]
 * @property {MerchantMetricFilter[]} [filters]
 * @property {string} [merchantId]
 * @property {string} [lenderId]
 * @property {number} [pivotPoints]
 */

/**
 * @typedef StonewallCustomer
 * @property {string} [mobile]
 * @property {string} [uid]
 */

/**
 * @typedef GetLimitRequest
 * @property {Object[]} [lenderSlugs]
 * @property {boolean} [onlyDefaultLender]
 * @property {StonewallCustomer} customer
 */

/**
 * @typedef DocumentObject
 * @property {string} [id]
 * @property {string} [userId]
 * @property {string} [name]
 * @property {string} [imageUrl]
 * @property {string} number
 * @property {Object} detail
 * @property {boolean} [valid]
 * @property {string} [entityId]
 */

/**
 * @typedef ManualKycRequest
 * @property {Object} remark
 * @property {string} status
 * @property {string} stepId
 * @property {string} entityMapId
 * @property {DocumentObject} [documentData]
 */

/**
 * @typedef RetriggerLenderOnboardRequest
 * @property {string} stepId
 * @property {Object} data
 */

/**
 * @typedef EntityMapDto
 * @property {string} id
 * @property {string} [merchantId]
 * @property {string} [status]
 * @property {string} lenderId
 * @property {number} [limit]
 * @property {string} [creditType]
 * @property {string} userId
 * @property {string} entityId
 */

/**
 * @typedef EntityDto
 * @property {string} id
 * @property {string} [type]
 * @property {string} [address]
 * @property {string} [name]
 * @property {string} [gender]
 * @property {string} [dob]
 * @property {string} userId
 */

/**
 * @typedef FindDocResponse
 * @property {string} status
 * @property {string} info
 * @property {string} number
 * @property {Object} [details]
 * @property {string} [name]
 */

/**
 * @typedef LenderKycStatus
 * @property {string} status
 * @property {string} [lenderId]
 * @property {string} [lenderName]
 * @property {string} [kycType]
 */

/**
 * @typedef StateResponeDto
 * @property {UserKycLenderStepMap} step
 * @property {boolean} isStepCompleted
 */

/**
 * @typedef KycStateMachineDto
 * @property {UserKycDetail} kycResult
 * @property {UserKycLenderStepMap} [action]
 */

/**
 * @typedef InitiateKycDto
 * @property {string} kycType
 * @property {string} lenderId
 * @property {Object} user
 * @property {string} [kycId]
 * @property {EntityMapDto} [entityRelation]
 */

/**
 * @typedef LenderOnboardDto
 * @property {Lender} [lender]
 * @property {Object} user
 * @property {UserLender} [userLenderDetail]
 * @property {LenderOnboardRequest} payload
 * @property {EntityMapDto} [entityRelation]
 * @property {string} ipAddress
 * @property {boolean} [overrideTtl]
 */

/**
 * @typedef StepDetails
 * @property {string} [name]
 * @property {string} [description]
 * @property {string} [iconUrl]
 * @property {string} status
 * @property {string} step
 * @property {number} order
 */

/**
 * @typedef OnboardStatusDto
 * @property {string} onboardStep
 * @property {string} onboardingId
 * @property {string} status
 * @property {string} action
 * @property {string} actionStatus
 * @property {Lender} lender
 * @property {string} [navigation]
 * @property {number} approvedLimit
 * @property {number} proposedLimit
 * @property {Object} [actionData]
 * @property {StepDetails[]} [steps]
 * @property {string} entityId
 * @property {string} entityMapId
 * @property {boolean} actionIsForm
 * @property {Form} [actionForm]
 */

/**
 * @typedef LenderFilters
 * @property {Object[]} [includeStatus]
 * @property {Object[]} [excludeStatus]
 * @property {Object} [allowDisabledLender]
 */

/**
 * @typedef Policy
 * @property {string} [id]
 * @property {string} [name]
 * @property {string} [url]
 * @property {Object} [data]
 * @property {string} [version]
 * @property {boolean} [active]
 * @property {Object} [type]
 * @property {number} [index]
 * @property {string} [lenderId]
 * @property {string} [merchantId]
 * @property {string} [workflowId]
 * @property {Object[]} [schemaRef]
 * @property {Object[]} [masterVariableRef]
 * @property {Object} [customVariable]
 * @property {string} [subType]
 * @property {Object} [createdAt]
 * @property {Object} [updatedAt]
 * @property {Object} [deletedAt]
 */

/**
 * @typedef GetKycDocsResponse
 * @property {FindDocResponse[]} documents
 */

/**
 * @typedef OrganizationLogosObject
 * @property {string} id
 * @property {string} name
 * @property {string} logo
 * @property {boolean} active
 */

/**
 * @typedef MetricSubTypes
 * @property {string} date
 * @property {string} [count]
 * @property {string} [sum]
 */

/**
 * @typedef MetricTypes
 * @property {MetricSubTypes[]} pivots
 * @property {string} [total]
 * @property {string} description
 * @property {string} title
 * @property {string} valueFormat
 * @property {string} logo
 */

/**
 * @typedef BreApprovedUsersResponse
 * @property {MetricTypes} data
 */

/**
 * @typedef Metrics
 * @property {MetricTypes} lenderApprovedUsers
 * @property {MetricTypes} breApprovedUsers
 * @property {MetricTypes} totalCreditLine
 */

/**
 * @typedef MetricData
 * @property {Metrics} metrics
 * @property {MerchantMetricFilter[]} filters
 * @property {MerchantMetricFilter[]} sort
 */

/**
 * @typedef ApprovedLenders
 * @property {string} status
 * @property {BreOutput[]} lenders
 */

/**
 * @typedef BreResultStatus
 * @property {string} status
 * @property {BreOutput[]} [approvedLenders]
 */

/**
 * @typedef GetAllUserLendersByEnityId
 * @property {string} entityId
 * @property {string} entityMapId
 * @property {string} userId
 * @property {string} status
 * @property {Lender} lender
 * @property {string} [partnerId]
 */

/**
 * @typedef LenderState
 * @property {string} [id]
 * @property {string} name
 * @property {string} lenderId
 * @property {number} index
 * @property {string} workflowName
 * @property {string} [workflowUrl]
 * @property {boolean} active
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [deletedAt]
 * @property {Lender} [lender]
 * @property {string} [parentStateId]
 * @property {number} ttl
 * @property {string} [displayName]
 * @property {string} [description]
 * @property {string} [iconUrl]
 * @property {boolean} isInteractive
 * @property {Object} [schema]
 */

/**
 * @typedef UserLenderState
 * @property {string} id
 * @property {string} lenderStateId
 * @property {string} lenderId
 * @property {string} userId
 * @property {string} status
 * @property {string} userLenderId
 * @property {string} remark
 * @property {boolean} active
 * @property {LenderState} [lenderState]
 * @property {Object} [data]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [deletedAt]
 * @property {string} [entityId]
 * @property {string} [entityMapId]
 * @property {string} [updatedBy]
 */

/**
 * @typedef LenderConfig
 * @property {string} [id]
 * @property {string} baseUrl
 * @property {string} [accessToken]
 * @property {string} [secret]
 * @property {Object} data
 * @property {string} lenderId
 * @property {boolean} [active]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [deletedAt]
 */

/**
 * @typedef Pg
 * @property {string} id
 * @property {string} name
 * @property {boolean} active
 */

/**
 * @typedef LenderPgConfig
 * @property {string} [id]
 * @property {string} mid
 * @property {string} clientId
 * @property {string} secret
 * @property {string} lenderId
 * @property {string} pgId
 * @property {boolean} active
 */

/**
 * @typedef FileUploadResponse
 * @property {string} fileId
 * @property {string} name
 * @property {string} path
 * @property {string} format
 * @property {number} size
 * @property {string} access
 * @property {string} tags
 * @property {string} metadata
 * @property {string} url
 * @property {string} thumbnail
 */

/**
 * @typedef PresignedUrl
 * @property {string} url
 * @property {Object} fields
 */

/**
 * @typedef PresignedUrlV2
 * @property {string} url
 * @property {Object} fields
 */

/**
 * @typedef LenderDocument
 * @property {string} [id]
 * @property {string} [lenderId]
 * @property {string} [type]
 * @property {Object} [document]
 * @property {boolean} [active]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 * @property {string} [deletedAt]
 */

/**
 * @typedef KycStatusResponse
 * @property {boolean} isKycInitiated
 * @property {string} userId
 * @property {LenderKycStatus[]} kycStatuses
 */

/**
 * @typedef WorkflowResponse
 * @property {Object} [data]
 */

/**
 * @typedef InitiateKycResponse
 * @property {UserKycDetail} kycResult
 * @property {Action} action
 */

/**
 * @typedef UploadDocResponse
 * @property {string} status
 * @property {Object} [data]
 * @property {string} [remark]
 * @property {UserKycDetail} kycResult
 * @property {Action} action
 */

/**
 * @typedef LenderOnboardResponse
 * @property {UserLender} result
 * @property {UserLenderState} action
 * @property {Object} data
 */

/**
 * @typedef OnboardingStatusResponse
 * @property {OnboardStatusDto[]} onboardStatuses
 */

/**
 * @typedef SignedUrlResponse
 * @property {PresignedUrl} signedUrl
 * @property {string} fileUrl
 */

/**
 * @typedef SignedUrlV2Response
 * @property {PresignedUrlV2} signedUrl
 * @property {string} fileUrl
 */

/**
 * @typedef PresignedUrlV3
 * @property {string} signedUrl
 * @property {Object} provider
 */

/**
 * @typedef SignedUrlV3Response
 * @property {PresignedUrlV3} signedDetails
 * @property {string} fileUrl
 */

/**
 * @typedef DigilockerLinkResponse
 * @property {string} authorizationUrl
 */

/**
 * @typedef GetDocumentsResponse
 * @property {FindDocResponse[]} documents
 */

/**
 * @typedef ApprovedLendersTransaction
 * @property {string} name
 * @property {string} slug
 * @property {string} imageUrl
 * @property {string} status
 * @property {boolean} active
 * @property {number} proposedLimit
 * @property {Object} createdAt
 * @property {Object} updatedAt
 * @property {Object} [deletedAt]
 * @property {boolean} [isDefault]
 * @property {Object} [__headers]
 */

/**
 * @typedef ApprovedPossibleLenders
 * @property {number} limit
 * @property {string} name
 * @property {string} slug
 * @property {boolean} active
 * @property {string} id
 * @property {LenderTheme} [theme]
 */

/**
 * @typedef AvailableLenders
 * @property {ApprovedPossibleLenders[]} approvedLenders
 * @property {ApprovedPossibleLenders[]} possibleLenders
 */

/**
 * @typedef CreditLimit
 * @property {number} availableLimit
 * @property {number} approvedLimit
 */

/**
 * @typedef CreditLimitResponse
 * @property {string} status
 * @property {string} message
 * @property {boolean} action
 * @property {CreditLimit} credit
 */

/**
 * @typedef LenderPgConfigResponse
 * @property {string} id
 * @property {string} mid
 * @property {string} clientId
 * @property {string} secret
 * @property {string} lenderId
 * @property {string} pgId
 * @property {boolean} active
 * @property {string} pgName
 * @property {boolean} pgActive
 */

/**
 * @typedef GetLendersResponse
 * @property {Lender[]} data
 */

/**
 * @typedef LenderConfigurationResponse
 * @property {Lender} lender
 * @property {LenderPgConfig} lenderPgConfig
 * @property {LenderConfig} lenderConfig
 * @property {LenderState[]} lenderState
 * @property {LenderKycStepMap[]} lenderKycStepMap
 */

/**
 * @typedef UpsertLenderResponse
 * @property {Object} data
 */

/**
 * @typedef UpsertLenderConfigResponse
 * @property {Object} data
 */

/**
 * @typedef CreateKycStepsSchema
 * @property {LenderKycStepMap[]} data
 */

/**
 * @typedef CreatePaymentGatewaySchema
 * @property {LenderPgConfig[]} data
 */

/**
 * @typedef CreateLenderStateSchema
 * @property {LenderState[]} data
 */

/**
 * @typedef GetAllPaymentGatewaysSchema
 * @property {Pg[]} data
 */

/**
 * @typedef PolicyResponse
 * @property {Policy[]} policies
 */

/**
 * @typedef CreditCheckBreResponse
 * @property {boolean} newLenderAssigned
 * @property {string} breStatus
 */

/**
 * @typedef MerchantConfigResponse
 * @property {string} id
 * @property {string} merhantConfigSchema
 */

/**
 * @typedef UserLenderByIdAndStatusResponse
 * @property {string} id
 * @property {string} userId
 * @property {string} lenderId
 * @property {boolean} [active]
 * @property {string} status
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} [deletedAt]
 * @property {number} approvedLimit
 * @property {string} [slug]
 * @property {LenderTheme} [theme]
 * @property {Object} [name]
 */

/**
 * @typedef IntgrAvailableCreditLimit
 * @property {number} limit
 * @property {string} lenderName
 * @property {string} slug
 * @property {boolean} isDefault
 * @property {string} logoUrl
 */

/**
 * @typedef IngtrAvailableLimit
 * @property {IntgrAvailableCreditLimit[]} available
 */

/**
 * @typedef IntgrCreditLimit
 * @property {IngtrAvailableLimit} limit
 * @property {Object} [__headers]
 */

/**
 * @typedef PossibleLendersInternal
 * @property {boolean} limit
 * @property {string} lenderName
 * @property {string} slug
 * @property {boolean} isDefault
 * @property {string} logo
 * @property {string} lenderId
 */

/**
 * @typedef PossibleLendersInternalResponse
 * @property {PossibleLendersInternal[]} lenders
 */

/**
 * @typedef GetTotalKycResponse
 * @property {string} totalKyc
 */

/**
 * @typedef GetTotalKycCompletedUsersResponse
 * @property {string} totalKycCompletedUsers
 */

/**
 * @typedef GetTotalPendingUsersResponse
 * @property {string} totalPendingKyc
 */

/**
 * @typedef GetTotalCreditProvidedResponse
 * @property {string} totalCreditLimit
 */

/**
 * @typedef MetaSchemaResponse
 * @property {string} title
 * @property {string} name
 * @property {string[]} required
 * @property {string} type
 * @property {Object} properties
 */

/**
 * @typedef MetaSchema
 * @property {MetaSchemaResponse} metaSchema
 */

/**
 * @typedef AddMetaSchema
 * @property {string} lenderSlug
 * @property {string} merchantId
 * @property {Object} schema
 */

/**
 * @typedef AddMetaSchemaRequest
 * @property {string} merchantId
 * @property {Object} schema
 */

/**
 * @typedef ValidatePanResponse
 * @property {string} panName
 * @property {string} isPanValid
 * @property {string} pan
 * @property {boolean} isProprietor
 * @property {string} panType
 * @property {string} [errorCode]
 * @property {string} [status]
 * @property {string} [errorMessage]
 */

/**
 * @typedef ConfirmPanResonse
 * @property {string} status
 * @property {string} statusCode
 * @property {string} message
 */

/**
 * @typedef LenderCountResponse
 * @property {number} active
 * @property {number} inActive
 */

/**
 * @typedef OnboardStepsDto
 * @property {StepDetails[]} steps
 * @property {Lender} lender
 */

/**
 * @typedef OnboardStepsResponse
 * @property {OnboardStepsDto[]} stepDetails
 */

/**
 * @typedef LenderDocumentResponse
 * @property {LenderDocument} data
 */

/**
 * @typedef GetUserLendersResponse
 * @property {UserLender[]} data
 */

/**
 * @typedef CreditReportResponse
 * @property {SourceCreditReport} data
 */

/**
 * @typedef KycDetailsReponse
 * @property {UserKycLenderStepMap} data
 */

/**
 * @typedef GetDocumentByIdResponse
 * @property {Document} data
 */

/**
 * @typedef GetAllFormsResponse
 * @property {Object} data
 */

/**
 * @typedef UpsertFormResponse
 * @property {Object} data
 */

/**
 * @typedef GstDetails
 * @property {string} gstTin
 * @property {string} businessName
 */

/**
 * @typedef GstDetailsResponse
 * @property {GstDetails[]} gstDetails
 */

/**
 * @typedef RegisterGstResponse
 * @property {Document} gstDocDetails
 * @property {string} status
 */

/**
 * @typedef PopulateFormResponse
 * @property {Object} form
 */

/**
 * @typedef ValidateFormFieldResponse
 * @property {string} status
 * @property {string} message
 * @property {Object} data
 */

/**
 * @typedef LenderCustomerMetricsResponse
 * @property {string} status
 * @property {string} message
 * @property {MetricData} data
 */

/**
 * @typedef ManualKycResponse
 * @property {string} message
 * @property {UserKycLenderStepMap} step
 */

/**
 * @typedef BreOutput
 * @property {string} id
 * @property {string} userId
 * @property {string} entityId
 * @property {string} [lenderId]
 * @property {string} [merchantId]
 * @property {string} policyName
 * @property {string} category
 * @property {string} type
 * @property {Object} output
 * @property {string} status
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {string} deletedAt
 */

/**
 * @typedef CustomerKycDetailsReponse
 * @property {UserKycLenderStepMap} data
 */

class Customer {
  constructor(config) {
    this.config = config;
  }

  /**
   * @param {Object} arg - Arg object.
   * @param {String} session - Session of the user
   * @param {string} arg.organizationId - This is organizationId
   * @param {VerifyCustomer} arg.body
   * @summary: Verify Customer
   * @description: Use this API to verify the customer based on  mobile number and countryCode.
   */
  verify({ disbursalRequest, session } = {}) {
    const { error } = CustomerValidator.verify().validate(
      {
        disbursalRequest,
      },
      { abortEarly: false }
    );
    if (error) {
      return Promise.reject(new FDKClientValidationError(error));
    }

    const query_params = {};

    return PlatformAPIClient.execute(
      this.config,
      "post",
      `/service/integration/user/authentication/${this.config.companyId}/validate-customer`,
      query_params,
      disbursalRequest,
      session
    );
  }

  /**
   * @param {Object} arg - Arg object.
   * @param {String} session - Session of the user
   * @param {string} arg.organizationId - This is organizationId
   * @param {ResendPaymentRequest} arg.body
   * @summary: Resend Payment Request
   * @description: Use this API to resend payment request to user
   */
  resendPaymentRequest({ disbursalRequest, session } = {}) {
    const { error } = CustomerValidator.resendPaymentRequest().validate(
      {
        disbursalRequest,
      },
      { abortEarly: false }
    );
    if (error) {
      return Promise.reject(new FDKClientValidationError(error));
    }

    const query_params = {};

    return PlatformAPIClient.execute(
      this.config,
      "post",
      `/service/integration/user/authentication/${this.config.companyId}/transaction/resend`,
      query_params,
      disbursalRequest,
      session
    );
  }

  /**
   * @param {Object} arg - Arg object.
   * @param {String} session - Session of the user
   * @param {string} arg.organizationId - This is organizationId
   * @param {CreateTransaction} arg.body
   * @summary: Create Order
   * @description: Use this API to create transaction for user
   */
  createOrder({ disbursalRequest, session } = {}) {
    const { error } = CustomerValidator.createOrder().validate(
      {
        disbursalRequest,
      },
      { abortEarly: false }
    );
    if (error) {
      return Promise.reject(new FDKClientValidationError(error));
    }

    const query_params = {};

    return PlatformAPIClient.execute(
      this.config,
      "post",
      `/service/integration/user/authentication/${this.config.companyId}/transaction`,
      query_params,
      disbursalRequest,
      session
    );
  }

  /**
   * @param {Object} arg - Arg object.
   * @param {String} session - Session of the user
   * @param {string} arg.organizationId - This is organizationId
   * @param {LinkAccount} arg.body
   * @summary: Link account
   * @description: Use this API to link account with merchant
   */
  link({ disbursalRequest, session } = {}) {
    const { error } = CustomerValidator.link().validate(
      {
        disbursalRequest,
      },
      { abortEarly: false }
    );
    if (error) {
      return Promise.reject(new FDKClientValidationError(error));
    }

    const query_params = {};

    return PlatformAPIClient.execute(
      this.config,
      "post",
      `/service/integration/user/authentication/${this.config.companyId}/account/link`,
      query_params,
      disbursalRequest,
      session
    );
  }

  /**
   * @param {Object} arg - Arg object.
   * @param {String} session - Session of the user
   * @param {string} arg.organizationId - This is organizationId
   * @param {UnlinkAccount} arg.body
   * @summary: Unlink account
   * @description: Use this API to unlink account from merchant
   */
  unlink({ disbursalRequest, session } = {}) {
    const { error } = CustomerValidator.unlink().validate(
      {
        disbursalRequest,
      },
      { abortEarly: false }
    );
    if (error) {
      return Promise.reject(new FDKClientValidationError(error));
    }

    const query_params = {};

    return PlatformAPIClient.execute(
      this.config,
      "post",
      `/service/integration/user/authentication/${this.config.companyId}/account/unlink`,
      query_params,
      disbursalRequest,
      session
    );
  }

  /**
   * @param {Object} arg - Arg object.
   * @param {String} session - Session of the user
   * @param {string} arg.organizationId - This is organizationId
   * @summary: Get Access Token
   * @description: Use this API to get access token
   */
  getAccessToken({} = {}) {
    const { error } = CustomerValidator.getAccessToken().validate(
      {},
      { abortEarly: false }
    );
    if (error) {
      return Promise.reject(new FDKClientValidationError(error));
    }

    const query_params = {};

    return PlatformAPIClient.execute(
      this.config,
      "post",
      `/service/integration/user/authentication/${this.config.companyId}/authorize`,
      query_params,
      undefined,
      session
    );
  }

  /**
   * @param {Object} arg - Arg object.
   * @param {String} session - Session of the user
   * @param {string} arg.organizationId - This is organizationId
   * @param {RefreshTokenRequest} arg.body
   * @summary: Renew Access Token
   * @description: Use this API to renew access token
   */
  renewAccessToken({ disbursalRequest, session } = {}) {
    const { error } = CustomerValidator.renewAccessToken().validate(
      {
        disbursalRequest,
      },
      { abortEarly: false }
    );
    if (error) {
      return Promise.reject(new FDKClientValidationError(error));
    }

    const query_params = {};

    return PlatformAPIClient.execute(
      this.config,
      "post",
      `/service/integration/user/authentication/${this.config.companyId}/token`,
      query_params,
      disbursalRequest,
      session
    );
  }

  /**
   * @param {Object} arg - Arg object.
   * @param {String} session - Session of the user
   * @param {string} arg.organizationId - This is organizationId
   * @param {Refund} arg.body
   * @summary: Refund customer order amount
   * @description: Use this API to verify the refund customer order amount
   */
  refund({ disbursalRequest, session } = {}) {
    const { error } = CustomerValidator.refund().validate(
      {
        disbursalRequest,
      },
      { abortEarly: false }
    );
    if (error) {
      return Promise.reject(new FDKClientValidationError(error));
    }

    const query_params = {};

    return PlatformAPIClient.execute(
      this.config,
      "post",
      `/service/integration/user/authentication/${this.config.companyId}/refund`,
      query_params,
      disbursalRequest,
      session
    );
  }

  /**
   * @param {Object} arg - Arg object.
   * @param {String} session - Session of the user
   * @param {string} arg.organizationId - This is organizationId
   * @param {string} [arg.refundId] - This is the refundId
   * @param {string} [arg.orderId] - This is the order ID
   * @summary: Refund status
   * @description: Use this API to fetch the refund status
   */
  refundStatus({ refundId, orderId, session } = {}) {
    const { error } = CustomerValidator.refundStatus().validate(
      {
        refundId,
        orderId,
      },
      { abortEarly: false }
    );
    if (error) {
      return Promise.reject(new FDKClientValidationError(error));
    }

    const query_params = {};
    query_params["refundId"] = refundId;
    query_params["orderId"] = orderId;

    return PlatformAPIClient.execute(
      this.config,
      "get",
      `/service/integration/user/authentication/${this.config.companyId}/refund/status`,
      query_params,
      undefined,
      session
    );
  }

  /**
   * @param {Object} arg - Arg object.
   * @param {String} session - Session of the user
   * @param {string} arg.organizationId - This is organizationId
   * @param {VerifyCustomer} arg.body
   * @summary: Fetch schemes
   * @description: Use this API to fetch available schemes for user order.
   */
  getSchemes({ disbursalRequest, session } = {}) {
    const { error } = CustomerValidator.getSchemes().validate(
      {
        disbursalRequest,
      },
      { abortEarly: false }
    );
    if (error) {
      return Promise.reject(new FDKClientValidationError(error));
    }

    const query_params = {};

    return PlatformAPIClient.execute(
      this.config,
      "post",
      `/service/integration/user/authentication/${this.config.companyId}/schemes`,
      query_params,
      disbursalRequest,
      session
    );
  }

  /**
   * @param {Object} arg - Arg object.
   * @param {String} session - Session of the user
   * @param {string} arg.organizationId - This is organizationId
   * @param {CheckEligibilityRequest} arg.body
   * @summary: Check Credit Eligibility
   * @description: Use this API to pre approve by checking the customer's credit eligibility based on  mobile number and countryCode and vintage data of monthly transactions.
   */
  checkEligibility({ disbursalRequest, session } = {}) {
    const { error } = CustomerValidator.checkEligibility().validate(
      {
        disbursalRequest,
      },
      { abortEarly: false }
    );
    if (error) {
      return Promise.reject(new FDKClientValidationError(error));
    }

    const query_params = {};

    return PlatformAPIClient.execute(
      this.config,
      "post",
      `/service/integration/user/authentication/${this.config.companyId}/eligibility`,
      query_params,
      disbursalRequest,
      session
    );
  }
}

class Credit {
  constructor(config) {
    this.config = config;
  }

  /**
   * @param {Object} arg - Arg object.
   * @param {String} session - Session of the user
   * @param {string} arg.organizationId - This is organization id
   * @param {DisbursalRequest} arg.body
   * @summary: Disburse the credit
   * @description: Use this API to disburse the credit.
   */
  disburse({ disbursalRequest, session } = {}) {
    const { error } = CreditValidator.disburse().validate(
      {
        disbursalRequest,
      },
      { abortEarly: false }
    );
    if (error) {
      return Promise.reject(new FDKClientValidationError(error));
    }

    const query_params = {};

    return PlatformAPIClient.execute(
      this.config,
      "post",
      `/service/integration/credit/credit/${this.config.companyId}/disburse`,
      query_params,
      disbursalRequest,
      session
    );
  }

  /**
   * @param {Object} arg - Arg object.
   * @param {String} session - Session of the user
   * @param {string} arg.organizationId - This is organization ID
   * @param {string} arg.orderId - This is order ID
   * @summary: check status of the order
   * @description: Use this API to check status the order.
   */
  getOrderStatus({ orderId, session } = {}) {
    const { error } = CreditValidator.getOrderStatus().validate(
      {
        orderId,
      },
      { abortEarly: false }
    );
    if (error) {
      return Promise.reject(new FDKClientValidationError(error));
    }

    const query_params = {};

    return PlatformAPIClient.execute(
      this.config,
      "get",
      `/service/integration/credit/credit/${this.config.companyId}/orders/${orderId}/status`,
      query_params,
      undefined,
      session
    );
  }

  /**
   * @param {Object} arg - Arg object.
   * @param {String} session - Session of the user
   * @param {string} arg.organizationId - This is organization id
   * @param {string} arg.lenderSlug - This is lender slug
   * @param {EligiblePlansRequest} arg.body
   * @summary: Get eligible plans
   * @description: Use this API to Get eligible plans.
   */
  getEligiblePlans({ lenderSlug, disbursalRequest, session } = {}) {
    const { error } = CreditValidator.getEligiblePlans().validate(
      {
        lenderSlug,
        disbursalRequest,
      },
      { abortEarly: false }
    );
    if (error) {
      return Promise.reject(new FDKClientValidationError(error));
    }

    const query_params = {};

    return PlatformAPIClient.execute(
      this.config,
      "post",
      `/service/integration/credit/credit/${this.config.companyId}/${lenderSlug}/plans`,
      query_params,
      disbursalRequest,
      session
    );
  }
}

class MultiKyc {
  constructor(config) {
    this.config = config;
  }

  /**
   * @param {Object} arg - Arg object.
   * @param {String} session - Session of the user
   * @param {Object} arg.organizationId -
   * @summary: Approved lenders
   * @description:
   */
  approvedLenders({} = {}) {
    const { error } = MultiKycValidator.approvedLenders().validate(
      {},
      { abortEarly: false }
    );
    if (error) {
      return Promise.reject(new FDKClientValidationError(error));
    }

    const query_params = {};

    return PlatformAPIClient.execute(
      this.config,
      "get",
      `/service/integration/kyc-onboarding/bre/${this.config.companyId}/approved-lenders`,
      query_params,
      undefined,
      session
    );
  }

  /**
   * @param {Object} arg - Arg object.
   * @param {String} session - Session of the user
   * @param {string} arg.organizationId -
   * @param {GetLimitRequest} arg.body
   * @summary: Get limit
   * @description:
   */
  getLimit({ disbursalRequest, session } = {}) {
    const { error } = MultiKycValidator.getLimit().validate(
      {
        disbursalRequest,
      },
      { abortEarly: false }
    );
    if (error) {
      return Promise.reject(new FDKClientValidationError(error));
    }

    const query_params = {};

    return PlatformAPIClient.execute(
      this.config,
      "post",
      `/service/integration/kyc-onboarding/credit/${this.config.companyId}/limit`,
      query_params,
      disbursalRequest,
      session
    );
  }
}

module.exports = PlatformClient;
