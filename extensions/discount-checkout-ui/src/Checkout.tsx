import {
  Banner,
  reactExtension,
  useDiscountCodes,
  useApplyDiscountCodeChange
} from '@shopify/ui-extensions-react/checkout';
import { useEffect, useState } from 'react';

export default reactExtension(
  'purchase.checkout.reductions.render-before',
  () => <Extension />,
);

function Extension() {

  const [hasRemovedDiscountCode, setHasRemovedDiscountCode] = useState(false);
  const discountCodes = useDiscountCodes();
  const applyDiscountCodeChange = useApplyDiscountCodeChange();

  useEffect(() => {
    async function handleDiscountCodes() {
      if (discountCodes.length) {
        for (const discountCode of discountCodes) {
          await applyDiscountCodeChange({
            code: discountCode.code,
            type: 'removeDiscountCode'
          });
        }
        setHasRemovedDiscountCode(true);
      }
    }

    handleDiscountCodes();
  }, [discountCodes]);

  if (hasRemovedDiscountCode) {
    return (
      <Banner title="Error Applying Discount Code" status='critical'>
        Can't Apply Discount Code During Black Friday
      </Banner>
    );
  } else {
    return null;
  }
}