import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import QuantityController from '../QuantityController'
import Button from '../Button'
import { useContext, useEffect, useMemo } from 'react'
import { Purchase } from 'src/types/purchase.type'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import noproduct from 'src/assets/images/no-product.png'
import { Helmet } from 'react-helmet-async'

export default function Cart() {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)

  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const buyProductMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        autoClose: 1000
      })
    }
  })

  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const location = useLocation()
  const choosePurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId
  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = useMemo(() => extendedPurchases.every((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchase = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchaseCount = checkedPurchase.length
  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchase.reduce((result, current) => {
        return result + current.price * current.buy_count
      }, 0),
    [checkedPurchase]
  )
  const totalCheckedPurchasePriceSave = useMemo(
    () =>
      checkedPurchase.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.price) * current.buy_count
      }, 0),
    [checkedPurchase]
  )

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const isChoosePurchaseIdFromLocation = choosePurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosePurchaseIdFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesInCart, choosePurchaseIdFromLocation, setExtendedPurchases])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  })

  const handleCheck = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleDelete = (purchaseIndex: number) => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchasesMutation.mutate([purchaseId])
  }

  const handleDeleteManyPurchase = () => {
    const purchasesId = checkedPurchase.map((purchase) => purchase._id)
    deletePurchasesMutation.mutate(purchasesId)
  }

  const handleBuyPurchases = () => {
    if (checkedPurchaseCount > 0) {
      const body = checkedPurchase.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))

      buyProductMutation.mutate(body)
    }
  }

  return (
    <div className='bg-neutral-100 py-16'>
      <Helmet>
        <title>Giỏ hàng | Shopee Clone</title>
        <meta name='description' content='Trang chứa những sản phẩm đã được thêm vào giỏ' />
      </Helmet>
      <div className='container'>
        {extendedPurchases.length > 0 ? (
          <>
            <div className='overflow-auto'>
              <div className='min-w-[1000px]'>
                <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='h-5 w-5 accent-primary'
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        />
                      </div>
                      <div className='flex-grow text-black'>Sản phẩm</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>Số lượng</div>
                      <div className='col-span-1'>Số tiền</div>
                      <div className='col-span-1'>Thao tác</div>
                    </div>
                  </div>
                </div>
                {extendedPurchases.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow'>
                    {extendedPurchases?.map((purchase, index) => (
                      <div
                        key={purchase._id}
                        className='mt-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                              <input
                                type='checkbox'
                                className='h-5 w-5 accent-primary'
                                checked={purchase.checked}
                                onChange={handleCheck(index)}
                              />
                            </div>
                            <div className='flex-grow'>
                              <div className='flex'>
                                <Link
                                  to={`${path.home}${generateNameId({
                                    name: purchase.product.name,
                                    id: purchase.product._id
                                  })}`}
                                  className='h-20 w-20 flex-shrink-0'
                                >
                                  <img src={purchase.product.image} alt={purchase.product.name} />
                                </Link>
                                <div className='flex-grow px-2 pb-2 pt-1'>
                                  <Link
                                    to={`${path.home}${generateNameId({
                                      name: purchase.product.name,
                                      id: purchase.product._id
                                    })}`}
                                    className='line-clamp-2 text-left'
                                  >
                                    {purchase.product.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-6'>
                          <div className='grid grid-cols-5 items-center'>
                            <div className='col-span-2'>
                              <div className='flex items-center justify-center'>
                                <span className='text-gray-300 line-through'>
                                  ₫{formatCurrency(purchase.product.price_before_discount)}
                                </span>
                                <div className='ml-3'>
                                  <span className='text-xs'>₫</span>
                                  <span>{formatCurrency(purchase.product.price)}</span>
                                </div>
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <QuantityController
                                max={purchase.product.quantity}
                                value={purchase.buy_count}
                                classNameWrapper='flex items-center'
                                onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                                onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                onType={handleTypeQuantity(index)}
                                onFocusOut={(value) =>
                                  handleQuantity(
                                    index,
                                    value,
                                    value >= 1 &&
                                      value <= purchase.product.quantity &&
                                      value !== (purchasesInCart as Purchase[])[index].buy_count
                                  )
                                }
                                disabled={purchase.disabled}
                              />
                            </div>
                            <div className='col-span-1'>
                              <div className='text-primary'>
                                <span className='text-xs'>₫</span>
                                <span>{formatCurrency(purchase.product.price * purchase.buy_count)}</span>
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <button
                                className='bg-none text-black transition-colors hover:text-primary'
                                onClick={() => handleDelete(index)}
                              >
                                Xoá
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className='z-2 sticky bottom-0 mt-4 flex items-center rounded-sm border-gray-100 bg-white p-5 shadow'>
              <div className='w-full overflow-auto'>
                <div className='flex w-full min-w-[1000px] items-center '>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-primary'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <button
                    onClick={handleCheckAll}
                    className='mx-3 border-none bg-none transition-colors hover:text-primary'
                  >
                    Chọn tất cả ({extendedPurchases.length})
                  </button>
                  <button
                    className='mx-3 border-none bg-none transition-colors hover:text-primary'
                    onClick={handleDeleteManyPurchase}
                  >
                    Xoá
                  </button>
                  <div className='ml-auto flex items-center'>
                    <div>
                      <div className='flex items-center justify-end'>
                        <div>Tổng thanh toán ({checkedPurchaseCount} sản phẩm)</div>
                        <div className='ml-2 text-2xl text-primary'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
                      </div>
                      <div className='flex items-center justify-end text-sm'>
                        <div className='text-gray-500'>Tiết kiệm</div>
                        <div className='ml-6 text-primary'>₫{formatCurrency(totalCheckedPurchasePriceSave)}</div>
                      </div>
                    </div>
                    <Button
                      className='ml-4 flex h-10 w-52 items-center justify-center bg-primary text-sm text-white hover:bg-primary/90'
                      onClick={handleBuyPurchases}
                      disabled={buyProductMutation.isLoading || checkedPurchaseCount === 0}
                    >
                      Mua hàng
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='text-center'>
            <img src={noproduct} alt='no purchase' className='mx-auto h-24 w-24' />
            <div className='mt-5 font-bold text-gray-400'>Giỏ hàng của bạn còn trống</div>
            <div className='mt-5 text-center'>
              <Link
                to={path.home}
                className='rounded-sm bg-primary px-9 py-2.5 uppercase text-white transition-all hover:bg-primary/80'
              >
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
