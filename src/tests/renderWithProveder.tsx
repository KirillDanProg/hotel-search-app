import React, {PropsWithChildren} from 'react'
import {render} from '@testing-library/react'
import type {RenderOptions} from '@testing-library/react'
import type {PreloadedState} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'

import {setupStore} from '../app/store'
import type {AppStore, RootState} from '../app/store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    store?: AppStore
}

export const renderWithProviders = (ui: React.ReactElement, {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
}: ExtendedRenderOptions = {}) => {

    const Wrapper = ({children}: PropsWithChildren<{}>): JSX.Element => {
        return <Provider store={store}>{children}</Provider>
    }

    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}