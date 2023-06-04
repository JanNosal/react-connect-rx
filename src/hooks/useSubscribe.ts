import { useEffect, useState } from "react";
import { Observable } from "rxjs";

const useSubscribe =
  <T>(init: T) =>
  (observable: Observable<T>) => {
    const [state, setState] = useState<T>(init);

    useEffect(() => {
      const subscription = observable.subscribe(setState);
      return () => subscription.unsubscribe();
    }, []);

    return state;
  };

export default useSubscribe;
